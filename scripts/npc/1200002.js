/*
  Donor Shop NPC
  @author slasso
*/

importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

var status;

var rings = [1112135, 1115124, 1112196, 1112195, 1112161, 1112198, 1112165, 1112171, 1115108, 1112238, 1115035, 1115009, 1115008, 1112273, 1115011, 1112277, 1112283, 1115019];
var wings = [1102758, 1102378, 1102376, 1102624, 1102487, 1102184, 1102252, 1102253, 1102318, 1102338, 1102349, 1102532, 1102546, 1102547, 1102548, 1102554, 1102604, 
				1102630, 1102642, 1102668, 1102697, 1102698, 1102699, 1102729, 1102779, 1102798, 1102806, 1102823, 1102824, 1102874, 1102377, 
				1102385, 1102386, 1102450, 1102451, 1102452, 1102453];
var pets = [5000060, 5000111, 5000146, 5000176, 5000200, 5000243, 5000261, 5000270, 5000271, 5000272, 5000273, 5000293, 5000294, 5000295, 5000317, 5000621]; // 5000275 broken

var mhair = Array(35430, 35440, 35650, 35710, 35720, 35730, 35750, 35760, 35800, 36810, 40060, 40270, 40390, 40500, 40510, 40570, 
40650, 40720, 40780, 40820, 40930, 42160, 43000, 43010, 43020, 43120, 43130, 43140, 43290, 43300, 43320, 43330, 43430, 43580, 43620, 
43660, 43670, 43680, 43690, 43700, 43740, 43750, 43790, 43810, 43890, 43910, 44160);
var mhair2 = Array(35220,44170, 44880, 44890, 45000, 45010, 45020, 45030, 45050, 45060, 45070,45080, 45090, 45110, 45120, 45130, 
45140, 45150, 45160, 45220, 45230, 46000, 46010, 46020, 46050, 46060, 46070, 46110, 46160, 46170, 46190, 46310, 46320, 46340, 46350, 
46360, 46370, 46390, 46420, 46430, 46440, 46450, 46460, 46480, 46490, 46500, 46510, 46520, 46530, 46560, 46570, 46590, 46600, 46620, 
46630, 46640);

var fhair = Array(37520, 38090, 38160, 38310, 38330, 38350, 38420, 38490, 38560, 38570, 38610, 38800, 41090, 41160, 
41400, 41520, 41590, 41600, 41740, 41750, 41860, 41870, 41890, 41900, 41930, 43980, 44000, 44010, 44020, 44120, 44300, 44310, 
44330, 44400, 44470, 44480, 44490, 44500, 44510, 44520, 44590, 44610, 44770, 44820, 44830, 44850, 44900, 44910, 44920, 44930, 44940,
44950, 44990, 47010, 47020, 47030, 47040);
var fhair2 = Array(38810, 47050, 47090, 47100, 47110, 47260, 47270, 47280, 47290, 47380, 47390, 47420, 47450, 47460, 47530, 47540, 
48000, 48010, 48020, 48040, 48050, 48060, 48070, 48080, 48100, 48170, 48180, 48320, 48330, 48340, 48350, 48360, 48370, 48380, 48390, 
48410, 48440, 48470, 48480, 48500, 48510, 48520, 48530, 48540, 48560, 48570, 48590, 48600, 48610, 48620, 48630, 48640, 48650, 48660, 
48700, 48710, 48730, 48740, 48760, 48800, 48820);

var mface = new Array(23033, 23040, 23055, 23069, 23072, 23079, 23084, 23086, 25000, 25006, 25011, 25014, 25019, 25021, 25025, 25030, 
25044, 25045, 25046, 25048, 25050, 25056, 25071, 25089, 25090, 25095, 27011, 25099, 26047, 27006, 27007, 27014, 27022, 27038, 27044, 
27053, 27079, 27081, 27088, 28000);
var fface = new Array(24001, 24008, 24010, 24012, 24013, 24020, 24022, 24027, 24029, 24037, 24058, 24064, 24077, 24079, 24087, 24091, 
26003, 26014, 26019, 26025, 26027, 26031, 26035, 26054, 26060, 26095, 26096, 28008, 28009, 28010, 28017, 28020, 28027, 28044, 28058, 
28088, 28098, 28000);
var beauty = -1;

var item;
var type;
var costs = {
	rings: 2,
	pets: 5,
	name: 10,
	wings: 10,
	hair: 5,
	face: 5
};

function start() {
	status=-1;
    cm.sendSimple("Hi! I can exchange #v4000492# for various donor items! What would u like to buy? (More to come!)#b\r\n" + 
			"#L1# Buy Chat & Label Rings for 2 CoGT  #b\r\n" + 
			"#L2# Buy Pets for 5 CoGT#b\r\n" + 
			"#L3# Name Change for 10 CoGT#b\r\n" + 
			"#L4# Buy Wings for 10 CoGT\r\n" + 
			"#L5# Haircut[1] for 5 CoGT \r\n" +
			"#L6# Haircut[2] for 5 CoGT \r\n" +
			"#L7# Plastic Surgery for 5 CoGT"
	);
}

function action (m,t,s) {
    if (m < 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if (s == 1) {
			type = 'rings';
            var selStr = "#e#kRing Shop:#n #r2#b #e#z4000492##n#k\r\n#bRings are +1 all stats#b";
            for (var i = 0; i < rings.length; i++)
				selStr += "\r\n#L" + i + "##v" + rings[i] + "##e#z" + rings[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 2) {
			type = 'pets';
            var selStr = "#e#kPet Shop:#n #r5#b #e#z4000492##n#k\r\nFun Fact: For 1m free nx #bCLICK HERE #b";
            for (var i = 0; i < pets.length; i++)
                selStr += "\r\n#L" + i + "##v" + pets[i] + "##e#z" + pets[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 3) {
            var selStr = "#e#kName Change Shop:#n #r10#b #e#z4000492##n#k\r\nPlease enter your new name below.";
            cm.sendGetText(selStr);
        } else if (s == 4) {
			type = 'wings';
		    var selStr = "#e#kWing Shop:#n #r10#b #e#z4000492##n#k\r\nFun Fact: For 1m free nx #bCLICK HERE #b";
            for (var i = 0; i < wings.length; i++)
				selStr += "\r\n#L" + i + "##v" + wings[i] + "##e#z" + wings[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 5) { //Hair selection
            beauty = 1;
            hairnew = Array();
            if (cm.getPlayer().getGender() == 0)
                for(var i = 0; i < mhair.length; i++)
                    hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
            if (cm.getPlayer().getGender() == 1)
                for(var i = 0; i < fhair.length; i++)
                    hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
            cm.sendStyle("#eWant a new Hairstyle? If you have 5 #b#t4000492##k I'll change it for you!", hairnew);
        } else if (s == 6) { //Hair selection
            beauty = 1;
            hairnew = Array();
            if (cm.getPlayer().getGender() == 0)
                for(var i = 0; i < mhair2.length; i++)
                    hairnew.push(mhair2[i] + parseInt(cm.getPlayer().getHair()% 10));
            if (cm.getPlayer().getGender() == 1)
                for(var i = 0; i < fhair2.length; i++)
                    hairnew.push(fhair2[i] + parseInt(cm.getPlayer().getHair() % 10));
            cm.sendStyle("#eWant a new Hairstyle? If you have 5 #b#t4000492##k I'll change it for you!", hairnew);
        } else if (s == 7) { //Face Selection
           beauty = 2;
            facenew = Array();
            if (cm.getPlayer().getGender() == 0) {
                for(var i = 0; i < mface.length; i++)
                    facenew.push(mface[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
            }
            if (cm.getPlayer().getGender() == 1) {
                for(var i = 0; i < fface.length; i++)
                    facenew.push(fface[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
            }
            cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t4000492##k I'll change it for you!", facenew);
        }
		if (!type) status++; // skip confirmation dialogue for non item purchase
    } else if(status == 1) {
		if (type) {
			if (type == 'rings') item = rings[s];
			if (type == 'pets') item = pets[s];
			if (type == 'wings') item = wings[s];
			
			cm.sendYesNo("Are you sure you want to buy #e#b#z" + item + "##n#k for #r" + costs[type] + " #b#e#z4000492##n#k?");
		}
	} else if (status == 2) {
        var text = cm.getText();

        if (beauty == 1) { // hair
            if (cm.haveItem(4000492, costs.hair)) {
                cm.gainItem(4000492, -costs.hair);
                cm.setHair(hairnew[s]);
                cm.sendOk("#eEnjoy your new and improved Haircut!");
            } else
                cm.sendOk("#e#rYou'll need " + costs.hair + " #b#t4000492##k");
        } else if (beauty == 2) { // face
            if (cm.haveItem(4000492, costs.face)) {
               cm.gainItem(4000492, -costs.face);
               cm.setFace(facenew[s]);
               cm.sendOk("#eEnjoy your new and improved Face!");
            } else
                cm.sendOk("#e#rYou'll need " + costs.face + " #b#t4000492##k");
        } else if (text != null) { // name change
			if (cm.haveItem(4000492, costs.name)) {
				var canCreate = Packages.client.MapleCharacter.canCreateChar(text);
				if (canCreate && text.length() > 3) {
					cm.gainItem(4000492, -costs.name);
					cm.getPlayer().setName(text);
					cm.getPlayer().changeName(text);
					cm.sendOk("Your name has been changed to #b" + text + "#k. You will have to login again for this to take effect.", 1);
				} else {
					cm.sendNext("I'm afraid you can't use the name #b" + text + "#k or it is already taken.", 1);
				}
			} else {
                cm.sendOk("#e#rYou'll need " + costs.name + " #b#t4000492##k");
			}
        } else { // item purchase
			if (!cm.haveItem(4000492, costs[type])) {
                cm.sendOk("#e#rYou'll need " + costs[type] + " #b#t4000492##k");
            } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(item)).isFull(0)) {
                cm.sendOk("Your inventory is full! Please make room and try again.");
            } else {
				cm.gainItem(4000492, -costs[type]);
				if (type == 'pets') cm.gainItem(item, 1, false, true, 10 * 365 * 1000 * 60 * 60 * 24); // 10 years before it dries up
				else cm.gainItem(item, 1);
				
			}
		}
		cm.dispose();
	}
	
}

