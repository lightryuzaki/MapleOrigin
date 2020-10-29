function enter(pi) {
	if (pi.getPlayer().getLevel() < 170) {
		pi.playerMessage(5, "No entry for players below 170");
		return false;
	} else {
		pi.getPlayer().changeMap(310000002, "enter00"); 
		return true;
	}
	
}  