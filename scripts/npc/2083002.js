/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
               Matthias Butz <matze@odinms.de>
               Jan Christian Meyer <vimes@odinms.de>

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

/**
 *Crystal of Roots
 *@Author: Ronan
 *@Author: Evol
 *@NPC: Crystal of Roots
 */
 
importPackage(Packages.server.expeditions);

function start() {
    cm.sendYesNo("Do you wish to leave?");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();

	else if(cm.getMapId() == 240050400) //if player is at this map, warp them to the map defined
    {
        cm.warp(240050000);
        cm.dispose();
    }
    else if(cm.getMapId() == 240050500) // fail map
    {
        cm.warp(240050400);
        cm.dispose();
    }
    else if(!cm.getEventInstance().isEventCleared()) //If event is NOT cleared, tp players out without GML reward
    {
        cm.warp(240050600);
        cm.dispose();
	} else {
	    var expedType = MapleExpeditionType.HORNTAIL;
	    var bossLogEntry = MapleExpeditionBossLog.BossLogEntry.HORNTAIL;
	    if (cm.getMapId() == 240060201) {
	        expedType = MapleExpeditionType.CHAOS_HORNTAIL;
            bossLogEntry = MapleExpeditionBossLog.BossLogEntry.CHAOS_HORNTAIL;
	    }

	    if (cm.reachedRewardLimit(expedType)) {
            cm.getClient().getWorldServer().removeUnclaimed(bossLogEntry, cm.getPlayer().getId());
			cm.getPlayer().dropMessage(6,"You have already reached your limit on GMLs for this boss");
            cm.warp(240050600);
            cm.dispose();
        } else if (!cm.getEventInstance().giveEventReward(cm.getPlayer())) {
            cm.sendNext("Please make room in your inventory first!");
            cm.dispose();
        } else {
            cm.getClient().getWorldServer().removeUnclaimed(bossLogEntry, cm.getPlayer().getId());
            cm.warp(240050600);
            cm.dispose();
        }
    }
}
