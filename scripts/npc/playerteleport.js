var status = 0;
var maps = [76000, 100000000, 800000000, 104000000, 102000000, 101000000, 103000000, 120000000, 110000000, 105040300 , 240000000, 130000000, 140000000, 200000000, 209000000, 211000000, 220000000, 230000000, 600000000, 251000000, 541000000, 261000000, 551000000, 240000000, 540000000, 260000200, 221000000];
var cost = [10, 10000,10000, 10000, 10000, 8000, 10000, 8000, 10000, 10000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,50000,50000, 50000];
var selectedMap = -1;
var mesos;

function start() {
    cm.sendNext("Hello, I am Spinel! If you want to go from town to town safely and fast, then you've come to the right place! We'll glady take you to your destination for an affordable price.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("There's a lot to see in this town, too. Come back and find us when you need to go to a different town.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "We have a special 90% discount for beginners.";
            selStr += "Choose your destination, for fees will change from place to place. Lost Memories is our home map. #b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " mesos)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("You don't have anything else to do here, huh? Do you really want to go to #b#m" + maps[selection] + "##k? It'll cost you #b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " mesos#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
            	mesos = cost[selectedMap] / 10;
            } else {
            	mesos = cost[selectedMap];
            }
            
            if (cm.getMeso() < mesos) {
                cm.sendNext("You don't have enough mesos. Sorry to say this, but without them, you won't be able to teleport.");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-mesos);
            if (selectedMap == 0 && cm.getPlayer().getMap().getForcedReturnId() == 999999999) { // save lost memories return location
                cm.getPlayer().saveLocation("FREE_MARKET");
            } else if (cm.getPlayer().getMap().getId() != 910000000 && cm.getPlayer().getMap().getId() != 76000) { // non normal maps and not fm/lost memories. ex: zakum's altar will return to forced location cave of passage
                cm.getPlayer().saveLocation("FREE_MARKET", true);
            }
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}
