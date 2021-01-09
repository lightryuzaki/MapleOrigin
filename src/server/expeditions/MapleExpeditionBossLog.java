/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
package server.expeditions;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

import client.MapleClient;
import config.YamlConfig;
import net.server.Server;
import tools.DatabaseConnection;
import tools.Pair;

/**
 *
 * @author Conrad
 * @author Ronan
 */
public class MapleExpeditionBossLog {

    public enum BossLogEntry {
        ZAKUM(2, 1, false, (short) 2, (short) 2),
        SHOWA(999, 1, false, (short) 0, (short) 0),
        HORNTAIL(2, 1, false, (short) 3, (short) 3),
        PINKBEAN(1, 1, true, (short) 20, (short) 35),
        SCARGA(1, 1, false, (short) 2, (short) 2),
        PAPULATUS(2, 1, false, (short) 1, (short) 1),
        VONLEON(1, 1, true, (short)  20, (short) 35),
        ARKARIUM(1, 1, true, (short)  30, (short) 45),
        KREXEL(2, 1, false, (short) 1, (short) 1),
        CHAOS_HORNTAIL(1, 1, false, (short) 6, (short) 6);
        //EMPRESS(1, 1, false);

        private int entries;
        private int timeLength;
        private int minChannel, maxChannel;
        private boolean week;
        private short gmlMin;
        private short gmlMax;

        BossLogEntry(int entries, int timeLength, boolean week, short gmlMin, short gmlMax) {
            this(entries, 0, Integer.MAX_VALUE, timeLength, week, gmlMin, gmlMax);
        }

        BossLogEntry(int entries, int minChannel, int maxChannel, int timeLength, boolean week, short gmlMin, short gmlMax) {
            this.entries = entries;
            this.minChannel = minChannel;
            this.maxChannel = maxChannel;
            this.timeLength = timeLength;
            this.week = week;
            this.gmlMin = gmlMin;
            this.gmlMax = gmlMax;
        }

        public short getGmlMin() {
            return gmlMin;
        }

        public short getGmlMax() {
            return gmlMax;
        }

        public int getEntries() {
            return entries;
        }

        private static List<Pair<Timestamp, BossLogEntry>> getBossLogResetTimestamps(LocalDateTime timeNow, boolean week) {
            List<Pair<Timestamp, BossLogEntry>> resetTimestamps = new LinkedList<>();

            Timestamp ts = Timestamp.valueOf(timeNow);  // reset all table entries actually, thanks Conrad
            for (BossLogEntry b : BossLogEntry.values()) {
                if (b.week == week) {
                    resetTimestamps.add(new Pair<>(ts, b));
                }
            }

            return resetTimestamps;
        }

        private static BossLogEntry getBossEntryByName(String name) {
            for (BossLogEntry b : BossLogEntry.values()) {
                if (name.contentEquals(b.name())) {
                    return b;
                }
            }

            return null;
        }

    }

    public static void resetBossLogTable() {
        /*
        Boss logs resets 12am, weekly thursday 12AM - thanks Smitty Werbenjagermanjensen (superadlez) - https://www.reddit.com/r/Maplestory/comments/61tiup/about_reset_time/
        */

        LocalDateTime now = LocalDateTime.now();

        if (now.getDayOfWeek() == DayOfWeek.THURSDAY) {
            MapleExpeditionBossLog.resetBossLogTable(true, now);
        }

        MapleExpeditionBossLog.resetBossLogTable(false, now);
    }

    private static void resetBossLogTable(boolean week, LocalDateTime t) {
        List<Pair<Timestamp, BossLogEntry>> resetTimestamps = BossLogEntry.getBossLogResetTimestamps(t, week);

        try {
            Connection con = DatabaseConnection.getConnection();

            for (Pair<Timestamp, BossLogEntry> p : resetTimestamps) {
                PreparedStatement ps = con.prepareStatement("DELETE FROM " + getBossLogTable(week) + " WHERE attempttime <= ? AND bosstype LIKE ?");
                ps.setTimestamp(1, p.getLeft());
                ps.setString(2, p.getRight().name());
                ps.executeUpdate();
                ps.close();
            }

            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static String getBossLogTable(boolean week) {
        return week ? "bosslog_weekly" : "bosslog_daily";
    }

    /**
     * Count successful boss encounters for use of GML reward limitation
     *
     * @param cid
     * @param boss
     * @return
     */
    public static int countPlayerEntriesByHwid(int cid, BossLogEntry boss) {
        int count;
        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ps = con.prepareStatement(
                    "SELECT COUNT(*) FROM " + getBossLogTable(boss.week) + " WHERE " +
                            "characterid IN (SELECT c.id FROM characters c JOIN accounts a ON c.accountid=a.id WHERE " +
                            "a.hwid = (SELECT a1.hwid FROM accounts a1 JOIN characters c1 ON c1.accountid=a1.id WHERE " +
                            "c1.id=? and bosstype LIKE ?)) AND completed=1")) {
                ps.setInt(1, cid);
                ps.setString(2, boss.name());
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        count = rs.getInt(1);
                    } else {
                        count = -1;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        return count;
    }

    public static int countPlayerEntries(int cid, BossLogEntry boss) {
        int ret_count = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT COUNT(*) FROM " + getBossLogTable(boss.week) + " WHERE characterid = ? AND bosstype LIKE ?");
            ps.setInt(1, cid);
            ps.setString(2, boss.name());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret_count = rs.getInt(1);
            } else {
                ret_count = -1;
            }
            rs.close();
            ps.close();
            con.close();
            return ret_count;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public static void insertPlayerEntry(int cid, BossLogEntry boss) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO " + getBossLogTable(boss.week) + " (characterid, bosstype) VALUES (?,?)");
            ps.setInt(1, cid);
            ps.setString(2, boss.name());
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void removePlayerEntry(int cid, BossLogEntry boss, int removeCount) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM " + getBossLogTable(boss.week) + " WHERE characterid = ? and bosstype LIKE ? LIMIT ?");
            ps.setInt(1, cid);
            ps.setString(2, boss.name());
            ps.setInt(3, removeCount);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static boolean attemptBoss(int cid, int channel, MapleExpedition exped, boolean log) {
        if (!YamlConfig.config.server.USE_ENABLE_DAILY_EXPEDITIONS) {
            return true;
        }

        BossLogEntry boss = BossLogEntry.getBossEntryByName(exped.getType().name());
        if (boss == null) {
            return true;
        }

        if (channel < boss.minChannel || channel > boss.maxChannel) {
            return false;
        }

        if (countPlayerEntries(cid, boss) >= boss.entries) {
            return false;
        }

        if (boss == BossLogEntry.HORNTAIL) { // if doing HT, check they didnt do CHT already
            if (countPlayerEntries(cid, BossLogEntry.CHAOS_HORNTAIL) > 0)
                return false;
        } else if (boss == BossLogEntry.CHAOS_HORNTAIL) { // if attempting Chaos Horntail, check to make sure they didnt do normal HT at all
            if (countPlayerEntries(cid, BossLogEntry.HORNTAIL) > 0)
                return false;
        }

        if (log) {
            insertPlayerEntry(cid, boss);
        }
        return true;
    }

    public static boolean reachedBossRewardLimit(int cid, MapleExpeditionType type) {
        BossLogEntry boss = BossLogEntry.getBossEntryByName(type.name());
        if (boss == null)
            return false;
        return countPlayerEntriesByHwid(cid, boss) > YamlConfig.config.server.EXPEDITION_HWID_LIMIT * boss.entries;
    }

    public static boolean attemptBoss(int cid, int channel, MapleExpeditionType type, boolean log) {
        if (!YamlConfig.config.server.USE_ENABLE_DAILY_EXPEDITIONS) {
            return true;
        }

        BossLogEntry boss = BossLogEntry.getBossEntryByName(type.name());
        if (boss == null) {
            return true;
        }

        if (channel < boss.minChannel || channel > boss.maxChannel) {
            return false;
        }

        if (countPlayerEntries(cid, boss) >= boss.entries) {
            return false;
        }

        if (log) {
            insertPlayerEntry(cid, boss);
        }
        return true;
    }

    public static void registerBossEntry(int cid, MapleExpeditionType type) {
        BossLogEntry boss = BossLogEntry.getBossEntryByName(type.name());
        insertPlayerEntry(cid, boss);
    }

    public static Map<String, String> getDailyBossEntries(int cid, boolean showZeros) {
        return getBossEntries(cid, showZeros, false);
    }


    public static Map<String, String> getWeeklyBossEntries(int cid, boolean showZeros) {
        return getBossEntries(cid, showZeros, true);
    }

    public static Map<String, String> getBossEntries(int cid, boolean showZeros, boolean weekly) {

        Map<String,String> dailyBossLog = new HashMap<>();
        // initialize all to 0
        for (BossLogEntry e : BossLogEntry.values()) {
            if ((weekly && e.week) || (!weekly && !e.week))
                dailyBossLog.put(e.name(), "0/" + e.entries + " (failed: 0 ");
        }

        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT bosstype, completed FROM bosslog_" + (weekly ? "weekly" : "daily") + " WHERE characterid = ?" )) {
                ps.setInt(1, cid);
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        String boss = rs.getString("bosstype");
                        boolean completed = rs.getBoolean("completed");

                        String text = dailyBossLog.get(boss);
                        int count = Integer.parseInt(text.substring(0, text.indexOf("/")));
                        if (!completed) {
                            int failedCount = Integer.parseInt(text.substring(text.indexOf("failed:") + 8, text.length() - 1));
                            text = text.substring(0, text.indexOf("failed:") + 8) + (1 + failedCount) + ")";
                        }
                        dailyBossLog.put(boss, (1 + count) + text.substring(text.indexOf("/")));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if (!showZeros) { // remove entries if all have 0 count
            int zeroCount = 0;
            for (Map.Entry<String, String> entry : dailyBossLog.entrySet()) {
                if (entry.getValue().startsWith("0"))
                    zeroCount++;
            }
            if (zeroCount == dailyBossLog.size())
                return new HashMap<>();
        }
        return dailyBossLog;
    }

    public static void setExpeditionCompleted(MapleClient c, MapleExpeditionType type) {
        BossLogEntry boss = BossLogEntry.getBossEntryByName(type.name());
        if (boss != null) {
            if (c.getWorldServer() != null && boss.getGmlMax() > 0)
                c.getWorldServer().addUnclaimed(boss, c.getPlayer().getId());
        }
        setExpeditionCompleted(c.getPlayer().getId(), type);
    }

    public static void setExpeditionCompleted(int id, MapleExpeditionType type) {
        BossLogEntry boss = BossLogEntry.getBossEntryByName(type.name());

        if (boss != null) {
            try (Connection con = DatabaseConnection.getConnection()) {
                try (PreparedStatement ps = con.prepareStatement(
                        "UPDATE " + getBossLogTable(boss.week) + " SET COMPLETED=1 WHERE " +
                                "characterid = ? and bosstype LIKE ? ORDER BY attempttime DESC LIMIT 1")) {
                    ps.setInt(1, id);
                    ps.setString(2, boss.name());
                    ps.executeUpdate();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

}
