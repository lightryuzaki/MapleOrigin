
importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

var status = -1;
var selectedType;
var selectedItem;

var collectionItems = [1302150, 1402044, 1302062, 1003027];

var belts = [
	{
		id: 1132014, 
		cost: [{id: 4000524, quantity: 50}]
	},
	{
		id: 1132015, 
		cost: [{id: 4000524, quantity: 250}, {id: 1132014, quantity: 1}]
	},
	{
		id: 1132016, 
		cost: [{id: 4000524, quantity: 250}, {id: 1132014, quantity: 1}]
	}
];

var scrolls = [2041301, 2041304, 2041307, 2041310, 2041302, 2041305, 2041308, 2041311, 2049114];

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
		status++;
    } else {
		cm.dispose();
		return;
    }
	
    if (status == 0) {
        cm.sendSimple("The time for scares and frights has come! We Witch's of Origin have been planning for this Halloween season over many full moons past and the time has finally come to spread our influence to all of Origin!\r\nBring me some #e#b#z4000524##n#k if you are interested in the arcane powers we witches hold. I may even share with you my own special scroll that unlock the full power of our arcane accesories!\r\n#b" + 
			"#L0##n#kPurchase a belt#l\r\n" + 
			"#L1##n#kTrade #r10#k tokens for a random belt scroll#l\r\n" + 
			"#L2#Trade #r25#k tokens for #b#e#z1302150##n#k#l\r\n" + 
			"#L3#Trade #r25#k tokens for #b#e#z1402044##n#k#l\r\n" + 
			"#L4#Trade #r25#k tokens for #b#e#z1302062##n#k#l\r\n" + 
			"#L5#Trade #r25#k tokens for #b#e#z1003027##n#k#l"
		);
    } else if (status == 1) {
		if (selection == 0) {
			selectedType = "belt";
			cm.sendSimple("Which belt would you like to purchase?\r\n#r#eNote: Each belt requires the previous tier#n#k" + 
				"\r\n#L0##b#e#v1132014# #z1132014##n#k (50 #v4000524#)#l\r\n" + 
				"\r\n#L1##b#e#v1132015# #z1132015##n#k (250 #v4000524# + #v1132014#)#l\r\n" + 
				"\r\n#L2##b#e#v1132016# #z1132016##n#k (250 #v4000524# + #v1132014#)#l"
			);
		} else if (selection == 1) {
			selectedType = "scroll";
			var shopStr = "Are you sure you want to purchase a random belt scroll?";
			cm.sendYesNo(shopStr);
        } else if (selection >= 2 && selection <= 5) {
			selectedType = "collection";
			selectedItem = collectionItems[selection - 2];
			var shopStr = "Are you sure you want to purchase #e#b#z" + selectedItem + "##n#k?";
			cm.sendYesNo(shopStr);
		}
    } else if (status == 2) {
		if (selectedType == "scroll") {
			if (!cm.haveItem(4000524, 10)) {
				cm.sendOk("Sorry, you do not have enough #b#e#z4000524##n#k to make this purchase.");
			} else if (cm.getPlayer().getInventory(MapleInventoryType.USE).isFull(0)) {
				cm.sendOk("Your inventory is full! Please make room and try again.");
			} else {
				var roll = getRandom(0, scrolls.length - 1);
				cm.gainItem(4000524, -10);
				cm.gainItem(scrolls[roll], 1);
				cm.sendOk("Here is your #e#b#z" + scrolls[roll] + "#!");
			}
		} else if (selectedType == "collection") {
			if (!cm.haveItem(4000524, 25)) {
				cm.sendOk("Sorry, you do not have enough #b#e#z4000524##n#k to make this purchase.");
			} else if (cm.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull(0)) {
				cm.sendOk("Your inventory is full! Please make room and try again.");
			} else {
				cm.gainItem(4000524, -25);
				cm.gainItem(selectedItem, 1);
				cm.sendOk("Here is your #e#b#z" + selectedItem + "#!");
			}
		} else {
			var costStr = "";
			for (var i = 0; i < belts[selection].cost.length; i++) {
				var cost = belts[selection].cost[i];
				costStr += "#r" + cost.quantity + "#k #e#b#z" + cost.id + "##n#k\r\n";
			}
			selectedItem = selection;
			cm.sendYesNo("Are you sure you want to purchase #e#b#z" + belts[selection].id + "##n#k?\r\nYou will need:\r\n" + costStr);
		}
	} else if (status == 3 && selectedType == "belt") {
		for (var i = 0; i < belts[selectedItem].cost.length; i++) {
			var cost = belts[selectedItem].cost[i];
			if (!cm.haveItem(cost.id, cost.quantity)) {
				cm.sendOk("Sorry, you do not have enough #b#e#z" + cost.id + "##n#k to make this purchase.");
				return;
			}
		}
		if (cm.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull(0)) {
			cm.sendOk("Your inventory is full! Please make room and try again.");
		} else {
			for (var i = 0; i < belts[selectedItem].cost.length; i++) {
				var cost = belts[selectedItem].cost[i];
				cm.gainItem(cost.id, -cost.quantity);
			}
			cm.gainItem(belts[selectedItem].id, 1);
			cm.sendOk("Here is your #e#b#z" + belts[selectedItem].id + "#!");
		}
	} else {
        cm.dispose();
    }
}

function getRandom(min, max) {
    if (min > max) {
        return(-1);
    }

    if (min == max) {
        return(min);
    }

    return(min + parseInt(Math.random() * (max - min + 1)));
}
