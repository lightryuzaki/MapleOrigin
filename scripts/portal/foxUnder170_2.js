importPackage(Packages.tools);
function enter(pi) {
	if (pi.getPlayer().getLevel() < 170)
		pi.playerMessage(5, "No entry for players below 170");
	else {
		pi.getPlayer().changeMap(310000123, "east00"); 
	}
	
}  