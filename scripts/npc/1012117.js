/*
Made by iPreSkooler
*/
var status = 0;
var beauty = 0;


var mface = new Array(20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029, 20030, 20031, 20032, 20033, 20034, 20035, 20036, 20037, 20038, 20039, 
20040, 20041, 20042, 20043, 20044, 20045, 20046, 20047, 20048, 20049, 20050, 20051, 20052, 20053, 20054, 20055, 20056, 20057, 20058, 20059, 20060, 
20061, 20062, 20063, 20064, 20065, 20066, 20067, 20068, 20069, 20070, 20071);
var mface2 = new Array(20072, 20073, 20074, 20075, 20076, 20077, 20078, 20079, 20080, 20081, 20082, 20083, 20084, 20085, 20086, 20087, 20088, 20089, 
20090, 20091, 20092, 20093, 20094, 20095, 20096, 20097, 20098, 20099, 23000, 23001, 23002, 23003, 23004, 23005, 23006, 23007, 23008, 23009, 23010, 
23011, 23012, 23013, 23014, 23015, 23016, 23017, 23018, 23019, 23020, 23021);
var mface3 = new Array(23022, 23023, 23024, 23025, 23026, 23027, 23028, 23029, 23030, 23031, 23032, 23034, 23035, 23036, 23037, 23038, 23039, 23041, 
23042, 23043, 23044, 23045, 23046, 23047, 23048, 23051, 23052, 23053, 23054, 23056, 23057, 23059, 23060, 23061, 23062, 23063, 
23064, 23065, 23066, 23067, 23068, 23070, 23071, 23073, 23074, 23075, 23076);
var mface4 = new Array(23080, 23081, 23082, 23083, 23085, 23087, 23088, 23089, 23090, 23091, 23092, 23093, 23094, 23095, 23096, 23097, 
23099, 25001, 25003, 25004, 25005, 25007, 25008, 25009, 25010, 25012, 25013, 25015, 25016, 25017, 25018, 25020, 25022, 25023, 25024, 
25026, 25027, 25028, 25029, 25031, 25032, 25033, 25034, 25035, 25036, 25037);
var mface5 = new Array(25038, 25039, 25040, 25041, 25042, 25043, 25047, 25049, 25051, 25052, 25053, 25054, 25055, 25057, 25058, 25059, 25060, 25061, 
25062, 25063, 25069, 25070, 25072, 25073, 25074, 25075, 25076, 25077, 25078, 25079, 25080, 25083, 
25084, 25085, 25088, 25091, 25093, 25096, 25097);
var mface6 = new Array(25098, 27008, 27009, 27010, 27013, 27015, 27016, 27017, 27018, 27019, 27020, 27021, 27023, 27024, 27025, 27035, 27036, 27037, 27039, 27040, 27041, 27045, 27046, 27047, 27048, 27049, 27050, 
27051, 27052, 27054, 27055);
var mface7 = new Array(27064, 27065, 27066, 27067, 27068, 27069, 27070, 27071, 27072, 27073, 27074, 27075, 27076, 27077, 27078, 27080, 27082, 
27083, 27084, 27085, 27086, 27087, 27089, 27090, 27092, 27095, 27096, 27097, 27098, 27099);

var fface = new Array(21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029, 21030, 21031, 21033, 21034, 21035, 21036, 21037, 21038, 21039, 
21040, 21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049, 21050, 21051, 21052, 21053, 21054, 21055, 21056, 21057, 21058, 21059, 21060, 
21061, 21062, 21063, 21064, 21065, 21066, 21067, 21068, 21069, 21070, 21071);
var fface2 = new Array(21072, 21073, 21074, 21075, 21076, 21077, 21078, 21079, 21080, 21081, 21082, 21083, 21084, 21085, 21086, 21087, 21088, 21089, 
21090, 21091, 21092, 21093, 21094, 21095, 21096, 21097, 21098, 21099, 24002, 24003, 24004, 24005, 24006, 24007, 24009, 24011, 24014, 24015, 24016, 
24017, 24018, 24019, 24021, 24023, 24024, 24025, 24026, 24028, 24030, 24031);
var fface3 = new Array(24032, 24033, 24034, 24035, 24036, 24038, 24039, 24040, 24041, 24042, 24043, 24044, 24045, 24048, 24049, 24050, 
24051, 24052, 24053, 24054, 24055, 24057, 24059, 24060, 24061, 24062, 24063, 24065, 24066, 24067, 24068, 24069, 24070, 24071, 24072, 24073, 
24074, 24075, 24076, 24078, 24080, 24081, 24082, 24083, 24084, 24085, 24086);
var fface4 = new Array(24088, 24089, 24090, 24092, 24093, 24094, 24095, 24097, 24098, 24099, 26000, 26001, 26002, 26004, 26005, 26006, 26007, 
26008, 26009, 26010, 26011, 26012, 26013, 26015, 26016, 26017, 26018, 26020, 26021, 26022, 26023, 26024, 26026, 26028, 26029, 26030, 26032, 26033, 
26034, 26036, 26037, 26038, 26039, 26040, 26041, 26042, 26043, 26044, 26045);
var fface5 = new Array(26046, 26047, 26048, 26049, 26050, 26051, 26052, 26053, 26055, 26056, 26057, 26058, 26059, 26061, 26062, 26063, 26064, 26065, 
26066, 26067, 26073, 26074, 26075, 26076, 26077, 26078, 26079, 26080, 26081, 26082, 26083, 26084, 26085, 26086, 26089, 26090, 26091, 26094, 26097, 26099);
var fface6 = new Array(28011, 28012, 28013, 28014, 28015, 28016, 28019, 28021, 28022, 28023, 28024, 28025, 28026, 28028, 28029, 28030, 28041, 
28042, 28043, 28045, 28046, 28049, 28050, 28051, 28052, 28053, 28054, 28055, 28056, 28057, 28059, 28060);
var fface7 = new Array(28070, 28071, 28072, 28073, 28074, 28075, 28076, 28078, 28079, 28080, 28081, 28082, 28083, 
28084, 28085, 28086, 28087, 28089, 28090, 28091, 28092, 28093, 28094, 28095, 28096, 28097, 28099);

var mhair = Array(33040, 33050, 33100, 33110, 33120, 33130, 33150, 33170, 33180, 33190, 33220, 33230, 33240, 33260, 33270, 33280, 33290, 33310, 
33320, 33330, 33340, 33350, 33360, 33380, 33390, 33410, 33440, 33450, 33460, 33470, 33510, 33530, 33540, 33550, 33580, 33600, 33630, 33640, 
33660, 33690, 33700, 33740, 33750, 33760, 33770, 33780, 40030, 41070);
var mhair2 = Array(33810, 33820, 33830, 33930, 33940, 33950, 33960, 33990, 35000, 35010, 35020, 35030, 35040, 35050, 35060, 35070, 35080, 35090, 
35100, 35110, 35120, 35130, 35140, 35150, 35160, 35170, 35180, 35190, 35200, 35210, 35240, 35260, 35270, 35280, 35290, 35300, 35310, 35330, 
35340, 35350, 35360, 35380, 35390, 35420, 35450, 35460, 35470, 35500, 35510, 46200);
var mhair3 = Array(35530, 35540, 35550, 35560, 35570, 35580, 35590, 35600, 35620, 35630, 35660, 35670, 35680, 35690, 35700, 35770, 35780, 35790, 
35950, 35960, 36000, 36010, 36020, 36030, 36040, 36050, 36070, 36080, 36090, 36100, 36110, 36130, 36140, 36150, 36170, 36180, 36190, 36200, 
36210, 36220, 36230, 36240, 36250, 36260, 36270, 36280, 36300, 36310, 36330, 36340);
var mhair4 = Array(36430, 36440, 36450, 36460, 36470, 36480, 36490, 36500, 36510, 36520, 36530, 36560, 36570, 36580, 36590, 36600, 36610, 36620, 
36630, 36640, 36670, 36680, 36690, 36700, 36710, 36750, 36760, 36780, 36790, 36800, 36840, 36880, 36900, 36920, 36940, 36950, 39000, 39260, 39310, 39320, 39330, 
39340, 39350, 39360, 39370, 39380, 39390, 39400, 39410, 39420, 39430, 39440, 40020);
var mhair5 = Array(33800, 40050, 40070, 40080, 40090, 40100, 40110, 40120, 40250, 40260, 40280, 40290, 40300, 40310, 40320, 40330, 40350, 40370, 
40400, 40410, 40420, 40450, 40470, 40490, 40520, 40530, 40540, 40550, 40560, 40580, 40590, 40600, 40610, 40620, 40630, 40640, 40660, 40670, 
40680, 40690, 40710, 40770, 40790, 40800, 40810, 40830, 40840, 40890, 40910, 40940, 41060);
var mhair6 = Array(33790, 42060, 42080, 43150, 43160, 43170, 43180, 43190, 43200, 43220, 43230, 43240, 43250, 43260, 43270, 43280, 43310, 43340, 
43350, 43410, 43420, 43440, 43450, 43570, 43590, 43600, 43610, 43730, 43760, 43770, 43780, 43800, 43820, 43830, 43850, 43900, 44130, 44140, 
44150, 44180, 45040, 45100, 46030, 46040, 46080, 46090, 46100, 46140, 46150, 46180);
var mhair7 = Array(35520, 46210, 46220, 46230, 46240, 46330, 46380, 46400, 46410, 46470, 46610, 46670, 46680, 46720, 46730, 46740, 46750, 46900, 
46910, 46920, 46930);

var fhair = Array(33140, 33160, 34000, 34010, 34030, 34040, 34050, 34060, 34110, 34120, 34130, 34170, 34180, 34200, 34210, 34230, 34240,
 34250, 34260, 34270, 34300, 34310, 34330, 34370, 34380, 34410, 34420, 34450, 34470, 34480, 34540, 34590, 34620, 34640, 34650, 34660, 34670,
 34680, 34690, 34720, 34750, 34760, 34770, 34790, 34800, 34810, 34830);
var fhair2 = Array(34840, 34850, 34860, 34870, 34880, 34900, 34910, 34940, 34950, 34960, 34970, 34980, 34990, 37000, 37010, 37020, 37030,
 37040, 37050, 37060, 37070, 37080, 37090, 37110, 37120, 37130, 37140, 37190, 37210, 37220, 37230, 37240, 37250, 37260, 37270, 37280, 37290,
 37300, 37310, 37320, 37370, 37380, 37400, 37410, 37430, 37440, 37450, 37460, 37490, 37510);
var fhair3 = Array(37520, 37530, 37560, 37570, 37580, 37600, 37620, 37630, 37640, 37650, 37690, 37710, 37720, 37730, 37740, 37750, 37760,
 37770, 37780, 37790, 37800, 37810, 37830, 37840, 37850, 37860, 37900, 37910, 37920, 37940, 37950, 37990, 38000, 38010, 38020, 38030, 38040,
 38050, 38060, 38070, 38080, 38100, 38110, 38130, 38140, 38150, 38180, 38240, 38250, 38260);
var fhair4 = Array(38380, 38390, 38400, 38430, 38440, 38450, 38460, 38470, 38480, 38500, 38530, 38550, 38580, 38600, 38620, 38630, 38650, 
38660, 38670, 38680, 38690, 38700, 38710, 38720, 38730, 38740, 38760, 38780, 38790, 38820, 38840, 38860, 38880, 38890, 38900, 38940, 
39000, 39250, 39310, 39320, 39330, 39340, 39350, 39360, 39370, 39380, 39390, 39400, 39410);
var fhair5 = Array(39430, 39440 ,40850, 40860 ,40870 ,40880 ,40900 ,40920 ,41080 ,41100 ,41110 ,41150 ,41170 ,41180 ,41200 ,41220 ,41340 ,
41350 ,41360 ,41370 ,41380 ,41390 ,41410 ,41420 ,41440 ,41460 ,41470 ,41480 ,41490 ,41510 ,41560 ,41570 ,41580 ,41610 ,41620 ,41630 ,41640 ,
41650 ,41660 ,41670 ,41680 ,41690 ,41700 ,41710 ,41720 ,41730 ,41760 ,41770 ,41780 ,41790);
var fhair6 = Array(39420, 41800, 41810, 41820, 41830, 41840, 41850, 41880, 41910, 41920, 41940, 41950, 41960, 41970, 41980, 41990, 42070, 42090, 
42110, 42120, 42150, 43210, 43630, 43640, 43650, 43840, 43860, 43870, 43880, 44030, 44190, 44200, 44290, 44320, 44340, 44350, 44360, 44370, 
44380, 44390, 44410, 44420, 44430, 44440, 44450, 44460, 44530, 44600, 44650, 44780, 44790);
var fhair7 = Array(38290, 44800, 44810, 44840, 44980, 47000, 47060, 47070, 47080, 47150, 47160, 47170, 47300, 47310, 47320, 47330, 47340, 47350, 
47360, 47370, 47400, 47410, 47430, 47440, 47520, 48030, 48090, 48130, 48140, 48150, 48160, 48200, 48210, 48220, 48230, 48400, 48430, 48450, 
48460, 48490, 48550, 48580, 48750, 48770, 48790, 48830, 48860, 48870, 48880, 48890, 48900, 48910, 48920, 48930);

var skin = Array(0, 1, 2, 3, 4, 5, 10, 11, 12);
var hairnew = Array();
var facenew = Array();
var colors = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) 
            cm.sendSimple("Hi, I'm Headward! Get your hairs and faces did! Woohooings!" + "\r\n#e#L0##i5150001##rHaircut#k#i5150001##l\r\n #L1##i5152001##rFace Surgery#k#i5152001#");
        else if (status == 1) {
			if (selection == 0) {
                         cm.sendSimple("You want to change your hairstyle? Which selection would you like?#b\r\n" + 
                            "#L0# Haircut[1]  \r\n" + 
                            "#L1# Haircut[2]  \r\n" + 
                            "#L2# Haircut[3]  \r\n" + 
                            "#L3# Haircut[4]  \r\n" + 
                            "#L4# Haircut[5]  \r\n" +
                            "#L5# Haircut[6]  \r\n" +
                            "#L6# Haircut[7]"
                         );
                         beauty = 1;
                        }
                        else if (selection == 1){
                            cm.sendSimple("You want to change your face? Which selection would you like?#b\r\n" + 
                            "#L0# Face Surgery[1]  \r\n" + 
                            "#L1# Face Surgery[2]  \r\n" + 
                            "#L2# Face Surgery[3]  \r\n" + 
                            "#L3# Face Surgery[4]  \r\n" + 
                            "#L4# Face Surgery[5]  \r\n" +
                            "#L5# Face Surgery[6]  \r\n" +
                            "#L6# Face Surgery[7]"
                            );
                            beauty = 2;
                        }
                        }
                else if (status == 2 && beauty == 1) {
                    if (selection == 0) {
                      beauty = 1;
                       hairnew = Array();
                   if (cm.getPlayer().getGender() == 0)
                       for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("#eWant a new Hairstyle? If you have a #b#t5150001##k I'll change it for you!", hairnew);
                 } else if (selection == 1) {
				beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair2.length; i++)
                        hairnew.push(mhair2[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair2.length; i++)
                        hairnew.push(fhair2[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("#eWant a new Hairstyle? If you have a #b#t5150001##k I'll change it for you!", hairnew);
			} else if (selection == 2) {
				beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair3.length; i++)
                        hairnew.push(mhair3[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair3.length; i++)
                        hairnew.push(fhair3[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("#eWant a new Hairstyle? If you have a #b#t5150001##k I'll change it for you!", hairnew);
            } else if (selection == 3) {
				beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair4.length; i++)
                        hairnew.push(mhair4[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair4.length; i++)
                        hairnew.push(fhair4[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("#eWant a new Hairstyle? If you have a #b#t5150001##k I'll change it for you!", hairnew);
            } else if (selection == 4) {
				beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair5.length; i++)
                        hairnew.push(mhair5[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair5.length; i++)
                        hairnew.push(fhair5[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("#eWant a new Hairstyle? If you have a #b#t5150001##k I'll change it for you!", hairnew);
            } else if (selection == 5) {
				beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair6.length; i++)
                        hairnew.push(mhair6[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair6.length; i++)
                        hairnew.push(fhair6[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("#eWant a new Hairstyle? If you have a #b#t5150001##k I'll change it for you!", hairnew);
            } else if (selection == 6) {
				beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair7.length; i++)
                        hairnew.push(mhair7[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair7.length; i++)
                        hairnew.push(fhair7[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("#eWant a new Hairstyle? If you have a #b#t5150001##k I'll change it for you!", hairnew);
			} 
                    }   else if (status == 2 && beauty == 2) {
                        if (selection == 0) {
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
                cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t5152001##k I'll change it for you!", facenew);
			} else if (selection == 1) {
				beauty = 2;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface2.length; i++)
                        facenew.push(mface2[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface2.length; i++)
                        facenew.push(fface2[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }	
                cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t5152001##k I'll change it for you!", facenew);
			} else if (selection == 2) {
				beauty = 2;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface3.length; i++)
                        facenew.push(mface3[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface3.length; i++)
                        facenew.push(fface3[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }	
                cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t5152001##k I'll change it for you!", facenew);
			} else if (selection == 3) {
				beauty = 2;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface4.length; i++)
                        facenew.push(mface4[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface4.length; i++)
                        facenew.push(fface4[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }	
                cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t5152001##k I'll change it for you!", facenew);
			} else if (selection == 4) {
				beauty = 2;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface5.length; i++)
                        facenew.push(mface5[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface5.length; i++)
                        facenew.push(fface5[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }	
                cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t5152001##k I'll change it for you!", facenew);
			} else if (selection == 5) {
				beauty = 2;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface6.length; i++)
                        facenew.push(mface6[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface6.length; i++)
                        facenew.push(fface6[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }	
                cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t5152001##k I'll change it for you!", facenew);
			} else if (selection == 6) {
				beauty = 2;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface7.length; i++)
                        facenew.push(mface7[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface7.length; i++)
                        facenew.push(fface7[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
                }	
                cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t5152001##k I'll change it for you!", facenew);
                        }
		} else if (status == 3){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150001)){
                    cm.gainItem(5150001, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("#eEnjoy your new and improved Haircut!");
                } else
                    cm.sendOk("#e#rYou'll need a #b#t5150001##k");
            }	
			 if (beauty == 2){
                if (cm.haveItem(5152001)){
                    cm.gainItem(5152001, -1);
                    cm.setFace(facenew[selection]);
                    cm.sendOk("#eEnjoy your new and improved Plastic Surgery!");
                } else
                    cm.sendOk("#e#rYou'll need a #b#t5152001##k");
            }
			  if (beauty == 3){
                if (cm.haveItem(5152013)){
                    cm.gainItem(5152013, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("#eEnjoy your new and improved Eye Color!");
                } else
                    cm.sendOk("#e#rYou'll need a #b#t5152013##k");
            }
            if (beauty == 4){
                if (cm.haveItem(5151001)){
                    cm.gainItem(5151001, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("#eEnjoy your new and improved Hair Color!");
                } else
                    cm.sendOk("#e#rYou'll need a #b#t5151001##k");
            }
			if (beauty == 5){
                if (cm.haveItem(5153000)){
                    cm.gainItem(5153000, -1);
                    cm.setSkin(skin[selection]);
                    cm.sendOk("#eEnjoy your new and improved Skin Color!");
                } else
                    cm.sendOk("#e#rYou'll need a #b#t5153000##k");
            }
        }
    }
}

