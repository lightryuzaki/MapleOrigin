

importPackage(Packages.server.expeditions);

 function enter(pi) {
    var eim = pi.getEventInstance();

    if (eim && eim.isEventCleared()) {
        if (pi.reachedRewardLimit(MapleExpeditionType.VONLEON)) {
            pi.getClient().getWorldServer().removeUnclaimed(MapleExpeditionBossLog.BossLogEntry.VONLEON, pi.getPlayer().getId());
            pi.getPlayer().dropMessage(6,"You have already reached your limit on GMLs for this boss");
            pi.getPlayer().changeMap(82100, "von02");
        } else if (!eim.giveEventReward(pi.getPlayer())) {
            pi.playerMessage(5, "Please make room in your inventory before leaving this place!");
        } else {
            pi.getClient().getWorldServer().removeUnclaimed(MapleExpeditionBossLog.BossLogEntry.VONLEON, pi.getPlayer().getId());
            pi.getPlayer().changeMap(82100, "von02");
        }
    } else if (!eim) {
            pi.getPlayer().changeMap(82100, "von02");
    } else {
    	pi.playerMessage(5, "Von Leon's rage is too strong making the portal unstable!");
	}

    return false;
}
