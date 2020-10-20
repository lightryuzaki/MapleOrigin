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

/**
 * @author: Ronan
 * @event: Ellin PQ
*/

var isPq = true;
var minPlayers = 1, maxPlayers = 6;
var minLevel = 44, maxLevel = 250;
var entryMap = 930000000;
var exitMap = 930000800;
var recruitMap = 300030100;
var clearMap = 930000800;

var minMapId = 930000000;
var maxMapId = 930000800;

var eventTime = 30;     // 30 minutes

var lobbyRange = [0, 0];

function init() {
    setEventRequirements();
}

function setLobbyRange() {
    return lobbyRange;
}

function setEventRequirements() {
    var reqStr = "";
        
    reqStr += "\r\n    Number of players: ";
    if(maxPlayers - minPlayers >= 1) reqStr += minPlayers + " ~ " + maxPlayers;
    else reqStr += minPlayers;

    reqStr += "\r\n    Level range: ";
    if(maxLevel - minLevel >= 1) reqStr += minLevel + " ~ " + maxLevel;
    else reqStr += minLevel;

    reqStr += "\r\n    For #radventurers only#k.";

    reqStr += "\r\n    Time limit: ";
    reqStr += eventTime + " minutes";

    em.setProperty("party", reqStr);
}

function setEventExclusives(eim) {
    var itemSet = [4001162, 4001163, 4001169, 2270004];
    eim.setExclusiveItems(itemSet);
}

function setEventRewards(eim) {
    var itemSet, itemQty, evLevel, expStages;

    evLevel = 1;    //Rewards at clear PQ
    itemSet = [4310000, 4310000, 4310000, 4310000, 4310000, 4310000];
    itemQty = [10, 11, 12, 13, 14, 15];
    eim.setEventRewards(evLevel, itemSet, itemQty);
    var expStages = [2 * 4000, 2 * 4000, 2 * 4000, 2 * 4000, 2 * 4000, 2 * 15000];    //bonus exp given on CLEAR stage signal
    eim.setEventClearStageExp(expStages);
}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
    var eligible = [];
    var hasLeader = false;

    if(party.size() > 0) {
        var partyList = party.toArray();

        for(var i = 0; i < party.size(); i++) {
            var ch = partyList[i];

            if(ch.getMapId() == recruitMap && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel) {
                if(ch.isLeader()) hasLeader = true;
                eligible.push(ch);
            }
        }
    }

    if(!(hasLeader && eligible.length >= minPlayers && eligible.length <= maxPlayers)) eligible = [];
    return eligible;
}

function setup(level, lobbyid) {
    var eim = em.newInstance("Ellin" + lobbyid);
    eim.setProperty("level", level);

    eim.setProperty("statusStg3", 0);

    eim.getInstanceMap(930000000).resetPQ(level);
	eim.getInstanceMap(930000100).resetPQ(level);
	eim.getInstanceMap(930000200).resetPQ(level);
	eim.getInstanceMap(930000300).resetPQ(level);
	eim.getInstanceMap(930000400).resetPQ(level);
	var map = eim.getInstanceMap(930000500);
	map.resetPQ(level);
    map.shuffleReactors();
	eim.getInstanceMap(930000600).resetPQ(level);
	eim.getInstanceMap(930000700).resetPQ(level);

    respawnStg2(eim);

    eim.startEventTimer(eventTime * 60000);
    setEventRewards(eim);
    setEventExclusives(eim);
    return eim;
}

function afterSetup(eim) {}

function respawnStg2(eim) {    
    if(!eim.getMapInstance(930000200).getPlayers().isEmpty()) eim.getMapInstance(930000200).instanceMapRespawn();
    eim.schedule("respawnStg2", 4 * 1000);
}

function changedMap(eim, player, mapid) {
    if (mapid < minMapId || mapid > maxMapId) {
        if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
            eim.unregisterPlayer(player);
            end(eim);
        } else {
            eim.unregisterPlayer(player);
        }
    }
}

function changedLeader(eim, leader) {
    var mapid = leader.getMapId();
    if (!eim.isEventCleared() && (mapid < minMapId || mapid > maxMapId)) {
        end(eim);
    }
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(entryMap);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    end(eim);
}

function playerUnregistered(eim, player) {}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, 0);
}

function playerLeft(eim, player) {
    if(!eim.isEventCleared()) {
        playerExit(eim, player);
    }
}

function playerDead(eim, player) {}

function playerRevive(eim, player) { // player presses ok on the death pop up.
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        eim.unregisterPlayer(player);
        end(eim);
    } else {
        eim.unregisterPlayer(player);
    }
}


function playerDisconnected(eim, player) {
    if (eim.isEventTeamLackingNow(true, minPlayers, player))
        end(eim);
    else
        playerExit(eim, player);
}

function leftParty(eim, player) {
    if (eim.isEventTeamLackingNow(false, minPlayers, player))
        end(eim);
    else
        playerLeft(eim, player);
}

function disbandParty(eim) {
    if (!eim.isEventCleared()) {
        end(eim);
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function end(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function giveRandomEventReward(eim, player) {
    eim.giveEventReward(player);
}

function clearPQ(eim) {
    eim.stopEventTimer();
    eim.setEventCleared();
}

function isPoisonGolem(mob) {
    var mobid = mob.getId();
    return (mobid == 9300182);
}

function monsterKilled(mob, eim, hasKiller) {
    var map = mob.getMap();
    var stage = ((map.getId() % 1000) / 100);

    if(isPoisonGolem(mob)) {
        clearStage(stage, eim, map.getId());
        eim.clearPQ();
    } else if(map.countMonsters() == 0) {
        if (stage == 1 || (stage == 4 && !hasKiller)) {
            clearStage(stage, eim, map.getId());
        }
    }
}

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);

    eim.giveEventPlayersStageReward(stage);
}

function allMonstersDead(eim) {}

function cancelSchedule() {}

function dispose(eim) {}
