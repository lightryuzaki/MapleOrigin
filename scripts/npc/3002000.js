function start() {
    if (cm.haveItem(1004502, 1)){
	cm.sendNext ("Have you heard of my home town Fox Point Village? A weird portal appeared one day and we arrived in this huuuuge forest.. It's actually not so different than Vulpes here..");
    cm.dispose();
	}
	else{
	cm.sendNext ("Have you heard of my home town Fox Point Village? A weird portal appeared one day and we arrived in this huuuuge forest.. It's actually not so different than Vulpes here..");
	cm.gainItem(1004502, 1);
    cm.dispose();
	}
}