/*vote point exchange npc
Exchanges votepoints for white scrolls dragon weapons and reverse weapons.
@@author shadowzzz*/

var status = 0;
var points = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var items = [1022082, 
/*Starts at 1, all the ITCG Equips */          1112135, 1115124, 1112196, 1112195, 1112161, 1112198, 1112165, 1112171, 1115108, 1112238, 1115035, 1115009, 1115008, 1112273, 1115011, 1112277,
/*Starts at 17, all the dragon weapons */      1112283, 1115019, 1322061, 1332075, 1332076, 1372045, 1382059, 1402047, 1412034, 1422038, 1432049, 1442067, 1452059, 1462051, 1472071, 1482024, 1492025,
/*Starts at 34, all the scrolls */             2049100, 2340000, 2049003,
/*Starts at 37, Warrior Empress Weapon*/       1102758, 1102378, 1102376, 1102624, 1102487, 2290023,2290060, 2290061, 2290032, 2290033,
/*Starts at 47, Bowman Empress Weapon*/        2290030, 2290031,
/*Starts at 49, Theif Empress Weapon*/         2290050, 2290051,
/*Starts at 51, Mage Empress Weapon */         2290090, 2290091,
/*Starts at 53, Pirate Empress Weaoon */       2290074, 2290075,
/*Starts at 55, Warrior Empress Gear */        2290136, 2290137, 2290012, 2290013, 2290096,
/*Starts at 60, Bowman Empress Gear*/          2290125, 1102277, 1052316, 1072487, 1082297,
/*Starts at 65, Thief Empress Gear */          1003175, 1102278, 1052317, 1072488, 1082298,
/*Starts at 70, Pirate Empress Gear*/          1003176, 1102279, 1052318, 1072489, 1082299,
/*Starts at 75, Mage Empress Gear*/            1003173, 1102276, 1052315,
/*Starts at 78, VIP Weapoons */                5000060, 5000111, 5000146, 5000176, 5000200, 5000243, 5000261, 5000270, 5000271, 5000272, 5000273, 5000293, 5000294, 5000295, 5000317, 5000621, 5000275,
/*Starts at 95, 60% Scrolls */                 1112135, 1115124, 1115035, 1115124, 2044501, 2044601, 2044701, 2044801, 2044901, 2044201, 2044101, 2044001, 2043001, 2043101, 2043201, 2043801, 2043701, 2043301];
var leaf = [4000492];
var fhair = Array(31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31360, 31380, 31400, 31410, 31420, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31910, 31920, 31930, 31940, 31950, 31990, 34010, 34020, 34030, 34050, 34110, 32560, 34040, 34100, 34110, 34120, 34130, 34150, 34180, 34210, 34220, 34230, 34250, 34260, 34240, 34270, 34320, 34330, 34340, 34350, 34360, 34370, 34380, 34400, 34430, 34440, 34470, 34480);
var mhair = Array(30000, 30020, 30030, 30040, 30050, 30060, 30070, 30090, 30100, 30110, 30120, 30130, 30140, 30150, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30380, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30920, 30930, 30940, 30950, 32160, 33030, 33060, 33070, 33080, 33090, 33100, 33120, 33130, 33150, 33170, 33180, 33190, 33240, 33250, 33260, 33270, 33280, 33290, 33310, 33350, 33360, 33370, 33380, 33390, 33400, 33410, 33440);
var mface = new Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029, 20030, 20031, 20032, 20033, 20035, 20036, 20037, 20038, 20040, 20043, 20044, 20045, 20046, 20047, 20048, 20049, 20050, 20051, 20052, 20053, 20055, 20056, 20057);
var fface = new Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029, 21030, 21031, 21033, 21034, 21035, 21036, 21038, 21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049, 21050, 21052, 21053, 21054, 21055);


function start() {
    cm.sendSimple("Hi! I can exchange #v4000492# for various donor items! What would u like to buy? (More to come!)#b\r\n#L1# Buy Chat & Label Rings for 2 CoGT  #b\r\n#L2# Buy Pets for 5 CoGT#b\r\n#L5# Buy Wings for 10 CoGT\r\n#L6# Haircut for 5 CoGT \r\n#L7# Plastic Surgery for 5 CoGT ");
}

function action (m,t,s) {
    if (m < 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 1) {
        sel = s;
        if (s == 0) {
            var selStr = "#e#kScroll shop:#n #r1#b #e#z4000492##n#k\r\nFun Fact: Mitochondria is not actually the powerhouse of the cell #b";
            var scrolls = items.slice(95, 113);
            for (var i = 0; i < scrolls.length; i++) {
                if (scrolls[i] != 2340000)
                    selStr += "\r\n#L" + (i < 3 ? i + 34 : i + 92) + "##v" + scrolls[i] + "##e#z" + scrolls[i] + (i > 2 ?"# x3#n" : "##n");
            }
            cm.sendSimple(selStr);
        } else if (s == 1) {
            var selStr = "#e#kRing Shop:#n #r2#b #e#z4000492##n#k\r\nFun Fact: Andy forgot to patch chat rings so we only have label atm LOL.\r\n#bRings are +1 all stats#b";
            var pageItems = items.slice(1, 19);
            for (var i = 0; i < pageItems.length; i++) {
                if (pageItems[i] != 1115011)
                    selStr += "\r\n#L" + (i + 1) + "##v" + pageItems[i] + "##e#z" + pageItems[i] + "##n";
            }
            cm.sendSimple(selStr);
        } else if (s == 2) {
            var selStr = "#e#kPet Shop:#n #r5#b #e#z4000492##n#k\r\nFun Fact: For 1m free nx #bCLICK HERE #b";
            var pageItems = items.slice(78, 94);
            for (var i = 0; i < pageItems.length; i++)
                selStr += "\r\n#L" + (i + 78) + "##v" + pageItems[i] + "##e#z" + pageItems[i] + "##n";
            cm.sendSimple(selStr);
        } else if (s == 3) {
            var selStr = "Fun Fact: The original MapleOrigin used to be called ProjectNanp because Jay has fat fingers #b";
            var pageItems = items.slice(115, 130); // TODO: add to items array and adjust slice range
            for (var i = 0; i < pageItems.length; i++)
                selStr += "\r\n#L" + (i + 53) + "##v" + pageItems[i] + "##e#z" + pageItems[i] + "##n";
            cm.sendSimple(selStr);
            // cm.sendSimple("Fun Fact: The original MapleOrigin used to be called ProjectNanp because Jay has fat fingers #b\r\n#L53##v1003172# Lionheart Battle Helm #b\r\n#L54##v1102275# Lionheart Battle Cape #b\r\n#L55##v1052314# Lionheart Battle Mail #b\r\n#L56# #v1072485#Lionheart Battle Boots #b\r\n#L57# #v1082295#Lionheart Battle Bracers #b\r\n#L58##v1003174# Falcon Wing Sentinel Cap #b\r\n#L59##v1102277# Falcon Wing Sentinel Cape #b\r\n#L60# #v1052316#Falcon Wing Sentinel Suit #b\r\n#L61# #v1072487#Falcon Wing Sentinel Boots #b\r\n#L62##v1082297# Falcon Wing Sentinel Gloves #b\r\n#L63##v1003175# Raven Horn Chaser Hat #b\r\n#L64# #v1102278#Raven Horn Chaser Cape #b\r\n#L65# #v1052317#Raven Horn Chaser Armor #b\r\n#L66# #v1072488#Raven Horn Chaser Boots #b\r\n#L67# #v1082298#Raven Horn Chaser Gloves #b\r\n#L68##v1003176# Shark Tooth Skipper Hat #b\r\n#L69##v1102279# Shark tooth Skipper Cape #b\r\n#L70##v1052318# Shark Tooth Skipper Coat #b\r\n#L71##v1072489# Shark Tooth Skipper Boots #b\r\n#L72##v1082299# Shark Tooth Skipper Gloves #b\r\n#L73# #v1003173#Dragon Tail Mage Sallet #b\r\n#L74# #v1102276#Dragon Tail Mage Cape #b\r\n#L75# #v1052315#Dragon Tail Mage Robe #b\r\n#L76# #v1072486#Dragon Tail Mage Shoes #b\r\n#L77##v1082296# Dragon Tail Mage Gloves");
        } else if (s == 4) {
            var selStr = "Fun Fact: The original MapleOrigin used to be called ProjectNanp because Jay has fat fingers #b";
            var pageItems = items.slice(131, 145); // TODO: add to items array and adjust slice range
            for (var i = 0; i < pageItems.length; i++)
                selStr += "\r\n#L" + (i + 53) + "##v" + pageItems[i] + "##e#z" + pageItems[i] + "##n";
            cm.sendSimple(selStr);
            // cm.sendSimple("Fun Fact: For 1m free nx #bCLICK HERE  #b\r\n#L37# #v1302152#Lionheart Cuttlas #b\r\n#L38# #v1312065#LionHeart Champion Axe #b\r\n#L39# #v1322096#Lionheart Battle Hammer #b\r\n#L40# #v1402095#Lionheart Battle Scimitar #b\r\n#L41# #v1412065#Lionheart Battle Axe #b\r\n#L42# #v1422066#Lionheart Blast Maul #b\r\n#L43# #v1432086#Lionheart Fuscina #b\r\n#L44##v1442116# Lionheart Partisan #b\r\n#L45# #v1452111#Falcon Wing Composite Bow #b\r\n#L46# #v1462099#Falcon Wing Heavy Cross Bow #b\r\n#L47##v1332130# Raven Horn Baselard #b\r\n#L48# #v1472122#Raven Horn Metal Fist #b\r\n#L49# #v1372084#Dragon Tail Arc Wand #b\r\n#L50# #v1382104#Dragon Tail War Staff #b\r\n#L51# #v1482084#Shark Tooth Wild Talon #b\r\n#L52# #v1492085#Shark Tooth Sharpshooter #b\r\n");
        }
		else if (s == 5) {
		    var selStr = "#e#kWing Shop:#n #r10#b #e#z4000492##n#k\r\nFun Fact: For 1m free nx #bCLICK HERE #b";
            var pageItems = items.slice(37, 42);
            for (var i = 0; i < pageItems.length; i++) {
                if (pageItems[i] != 2290096 && pageItems[i] != 2290125)
                    selStr += "\r\n#L" + (i + 37) + "##v" + pageItems[i] + "##e#z" + pageItems[i] + "##n";
            }
            cm.sendSimple(selStr);
            // cm.sendSimple("Fun Fact: For 1m free nx #bCLICK HERE  #b\r\n#L37# #v1102758#Triple Throw 20 #b\r\n#L38# #v1102378#Triple Throw 30 #b\r\n#L39# #v1102376#Brandish 20 #b\r\n#L40# #v1102624#Brandish 30 #b\r\n#L41# #v1102487#Berserk 20 #b\r\n#L42# #v2290023#Berserk 30 #b\r\n#L43# #v2290060#Hurricane 20 #b\r\n#L44##v2290061#Hurricane 30 #b\r\n#L45# #v2290032#Chain Lightning 20 #b\r\n#L46# #v2290033#Chain Lightning 30 #b\r\n#L47##v2290030#Paralyze 20 #b\r\n#L48# #v2290031#Paralyze 30 #b\r\n#L49# #v2290050#Angel Ray 20 #b\r\n#L50# #v2290051#Angel Ray 30 #b\r\n#L51# #v2290090#Boomerang Step 20 #b\r\n#L52# #v2290091#Boomerang Step 30 #b\r\n#L53# #v2290074#Snipe 20 #b\r\n#L54# #v2290074# Snipe 30 #b\r\n#L55# #v2290136#Combo Tempest 20 #b\r\n#L56# #v2290137#Combo Tempest 30 #b\r\n#L57# #v2290012#Blast 20 #b\r\n#L58# #v2290013#Blast 30 #b\r\n#L59# #v2290096#Maple Warrior 20 #b\r\n#L60# #v2290125#Maple Warrior 30 #b\r\n");
        } else if (s == 6) { //Hair selection
            beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
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
    } else if (status == 2) {
        if (sel == 100) {
            if (cm.haveItem(leaf) >= 6) {
                if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(1)) {
                   // var currentRewardPoints = cm.getPlayer().getRewardPoints();
                    //cm.getPlayer().setRewardPoints(currentRewardPoints - 6);
					cm.gainItem(4000492, -6)
                    cm.gainItem(2340000, 5);
                }
                else{
                    cm.sendOk("Please make sure you have enough space to hold these items!");
                }
            } else {
                cm.sendOk(" You don't have 6 vote points. ");
            }
        }
		else {
            if (cm.haveItem(4000492) >= 1) {
               if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(0)) {
                   // var currentRewardPoints = cm.getPlayer().getRewardPoints();
                   // cm.getPlayer().setRewardPoints(currentRewardPoints - points[s]);
				   //cm.gainItem(leaf, - points[s]);
                    if (items[s] == 2049100 || items[s] == 2340000 || items[s] == 2049003) {
                        if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).isFull(0)) {
                            if(cm.haveItem(leaf, 1)) {
                                cm.gainItem(leaf, -1);
                                cm.gainItem(items[s], 1);
                            } else {
                                cm.sendOk("Sorry, you don't have enough leafs!");
                            }
                        } else {
                            cm.sendOk("Please make sure you have at least 1 slots empty in your inventory");
                        }
                    }
                    else if(items[s] == 2044301 || items[s] == 2044401 || items[s] == 2044501 || items[s] == 2044601 || items[s] == 2044701 || items[s] == 2044801 || items[s] == 2044901 || items[s] == 2044201 || items[s] == 2044101 || items[s] == 2044001 || items[s] == 2043001 || items[s] == 2043101 || items[s] == 2043201 || items[s] == 2043801 || items[s] == 2043701 || items[s] == 2043301 || items[s] == 2040914 || items[s] == 2040919){
                        if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).isFull(0)) {
                            if(cm.haveItem(leaf, 1)) {
                                cm.gainItem(leaf, -1);
                                cm.gainItem(items[s], 3);
                            } else {
                                cm.sendOk("Sorry, you don't have enough leafs!");
                            }
                        } else {
                            cm.sendOk("Please make sure you have at least 1 slots empty in your inventory");
                        }
                    }
					else if(items[s] == 1102758 || items[s] == 1102378 || items[s] == 1102376 || items[s] == 1102624 || items[s] == 1102487 || items[s] == 2290023 || items[s] == 2290032 || items[s] == 2290033 || items[s] == 2290030 || items[s] == 2290031 || items[s] == 2290050 || items[s] == 2290051 || items[s] == 2290090 || items[s] == 2290091 || items[s] == 2290074 || items[s] == 2290075 || items[s] == 2290136 || items[s] == 2290137 || items[s] == 2290012 || items[s] == 2290013 || items[s] == 2290096 || items[s] == 2290125){
                        if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).isFull(0)) {
                            if(cm.haveItem(leaf, 10)) {
                                cm.gainItem(leaf, -10);
                                cm.gainItem(items[s], 1);
                            } else {
                                cm.sendOk("Sorry, you don't have enough leafs!");
                            }
                        } else {
                            cm.sendOk("Please make sure you have at least 1 slots empty in your inventory");
                        }
                    }
                    else if(items[s] == 5000060 || items[s] == 5000111 || items[s] == 5000146 || items[s] == 5000176 || items[s] == 5000200 || items[s] == 5000243 || items[s] == 5000261 || items[s] == 5000270 || items[s] == 5000271 || items[s] == 5000272 || items[s] == 5000273 || items[s] == 5000293 || items[s] == 5000294 || items[s] == 5000295 || items[s] == 5000317 || items[s] == 5000621 || items[s] == 5000275){
                        if(cm.haveItem(leaf, 5)) {
                            cm.gainItem(leaf, -5);
                            cm.gainItem(items[s], 1, false, true, 10 * 365 * 1000 * 24 * 60 * 60); // dry up in 10 year);
                       } else {
                            cm.sendOk("Sorry, you don't have enough leafs!");
                        }
                    }
					else if(items[s] == 1112135 || items[s] == 1115124 || items[s] == 1112196 || items[s] == 1112195 || items[s] == 1112161 || items[s] == 1112198 || items[s] == 1112165 || items[s] == 1112171 || items[s] == 1115108 || items[s] == 1112238 || items[s] == 1115035 || items[s] == 1115009 || items[s] == 1115008 || items[s] == 1112273 || items[s] == 1115011 || items[s] == 1002553 || items[s] == 1112277 || items[s] == 1112283 || items[s] == 1115019){
                        if (items[s] == 1112277 && cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).isFull(0)) {
                            cm.sendOk("Please make sure you have at least 1 empty use slots.");
                        } else {
                            if(cm.haveItem(leaf, 2)) {
                                cm.gainItem(leaf, -2);
                                cm.gainItem(items[s], 1);
                            } else{
                                cm.sendOk("Sorry, you don't have enough leafs!");
                            }
                        }
                    }
                    else if (s == 5610000 || s == 5610001) {
                        if (items[s] == 1112277 && cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.CASH).isFull(0)) {
                            cm.sendOk("Please make sure you have at least 1 empty cash slots.");
                        } else {
                            if (s == 5610000) {
                                if(cm.haveItem(leaf, 3)) {
                                    cm.gainItem(leaf, -3);
                                    cm.gainItem(s, 1);
                                } else {
                                    cm.sendOk("Sorry, you don't have enough leafs!");
                                }
                            } else if (s == 5610001) {
                                if(cm.haveItem(leaf, 2)) {
                                  cm.gainItem(leaf, -2);
                                  cm.gainItem(s, 1);
                              } else {
                                  cm.sendOk("Sorry, you don't have enough leafs!");
                              }
                            }
                        }
                    }

					/*else if(items[s] == 1102758 || items[s] == 1102378 || items[s] == 1102376 || items[s] == 1102624 || items[s] == 1102487 || items[s] == 2290023 || items[s] == 2290032 || items[s] == 2290033 || items[s] == 2290030 || items[s] == 2290031 || items[s] == 2290050 || items[s] == 2290051 || items[s] == 2290090 || items[s] == 2290091 || items[s] == 2290074 || items[s] == 2290075 || items[s] == 2290136 || items[s] == 2290137 || items[s] == 2290012 || items[s] == 2290013 || items[s] == 2290096 || items[s] == 2290125){
                        cm.gainItem(leaf, -15);
						cm.gainItem(items[s], 1);
                    }*/
					
                }
                else {
                    cm.sendOk("Please make sure you have at least 1 empty slots in both equip and etc.");
                }
            } else {
                var pts = points[s];
                if (!pts)
                    if (s == 5610000)
                        pts = 3;
                    if (s == 5610001)
                        pts = 2;

                cm.sendOk(" You don't have " + pts + " Golden Maple Leafs. ");
            }
        }
        cm.dispose();
    } else if (status == 3) {
        if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).isFull(1)) {
            cm.sendOk("Please make sure you have at least 1 empty slots in etc.");
        } else {
            cm.gainItem(leaf, -1);
            cm.gainItem(4000038, 40);
            cm.sendOk("Enjoy your trophies!");
        }
        cm.dispose();
    }
}
