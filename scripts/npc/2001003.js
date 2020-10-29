
var common = [1051304, 1051376, 1051070, 1051233, 1052168, 1050014, 1051018, 1051022, 1052023, 1050015, 1005173, 1053316, 1053317, 1052675, 1072816, 1003842, 1003714, 1004865, 1004866, 1004867, 1004868, 1004869, 1003377, 1004633, 1072878, 1072884, 1002839, 1004873, 1102239, 1102242, 1102254, 1102285, 1102286, 1102287, 1102768, 1102778, 1102868, 1102503, 1102510, 1102614];
var uncommon = [1053083, 1051349, 1052026, 1052172, 1052224, 1052228, 1052248, 1052550, 1053257, 1050248, 1052594, 1052595, 1003802, 1003803, 1072791, 1072803, 1052370, 1052418, 1050234, 1051284, 1002839, 1003713, 1005001, 1005002, 1072760, 1072440, 1102232, 1102631, 1102651, 1102652, 1102653, 1102654, 1102870, 1005379, 1005378];
var rare = [1050477, 1050478, 1050479, 1051573, 1051143, 1052204, 1052212, 1052213, 1053239, 1053354, 1050321, 1052440, 1050114, 1053216, 1053215, 1052864, 1053053, 1072920, 1004113, 1053107, 1052666, 1052667, 1003968, 1003967, 1072866, 1072867, 1082551, 1082552, 1004875, 1003000, 1005236, 1003080, 1005164, 1102217, 1102355, 1102420, 1102615, 1102622, 1102725, 1102772];
var urare = [1053450, 1053449, 1053058, 1052210, 1052246, 1053375, 1053422, 1052726, 1042284, 1052074, 1072742, 1004003, 1004004, 1005335, 1102274, 1102292, 1102766, 1102820, 1102865, 1050356, 1051426];


function getRandom(min, max) {
    if (min > max) {
        return(-1);
    }

    if (min == max) {
        return(min);
    }

    return(min + parseInt(Math.random() * (max - min + 1)));
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
		cm.dispose();
	else {
		if (mode == 0 && status == 0)
			cm.dispose();

		if (mode == 1)
			status++;
		else
			status--;

        
		if (status == 0) { // confirm selection with yes/no
			cm.sendYesNo("#i3991013##i3991023##i3991006##i3991000##i3991002##i3991007##i3991000##i3991015##i3991014##i3991013#\r\n" + 
						"Hello #h #!\r\n\r\nWant to try your luck at the #r#eNX Gachapon?#n#k You can earn assorted up to date NX EQUIPMENTS! \r\nRemember that each spin will cost you a\r\n\r\n#i5220020##t5220020#");
        } else if (status == 1) { // finalize the purchase
		    var vp = cm.getPlayer().getClient().getVotePoints();
            if (!cm.haveItem(5220020, 1)) {
				cm.sendOk("Sorry you do not have an #i5220020##e#b#z5220020##n#k! #i5220020##e#b#z5220020##k#n can be purchased from Mia in the FM.");
            } else if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(0)) {
                cm.sendOk("Your inventory is full! Please make room and try again.");
            } else {
				var roll = getRandom(0, 10); // random number from 0-10 to decide which array to choose from
				var item = -1;
				if (roll >= 0 && roll <= 4)
					item = common[getRandom(0, common.length - 1)];
				else if (roll >= 5 && roll <= 7)
					item = uncommon[getRandom(0, uncommon.length - 1)];
				else if (roll >= 8 && roll <= 9)
					item = rare[getRandom(0, rare.length - 1)];
				else if (roll == 10)
					item = urare[getRandom(0, urare.length - 1)];
				
				if (item != -1) {					
					cm.gainItem(5220020, -1);
					cm.gainItem(item, 1);
					cm.sendOk("#b#eCongratulations!#n#k You have obtained a #e#b#v" + item + "##z" + item + "#");
				}
            }
            cm.dispose();
        }
	}
}
