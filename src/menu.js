var MenuLayer = cc.Layer.extend({
    sprite: null,
    isFlipY: false,
    isShow: false,
    ctor: function () {

        this._super();
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.x = cc.winSize.width / 2;
        this.sprite.y = cc.winSize.height * 6 / 8;
        this.addChild(this.sprite);
        this.isShow = true;

        let item1 = new cc.MenuItemFont("test1", this.item1, this);
        let item2 = new cc.MenuItemFont("test2", this.item2, this);
        let item3 = new cc.MenuItemFont("test3", this.item3, this);
        let item4 = new cc.MenuItemFont("test4", this.item4, this);
        let item5 = new cc.MenuItemFont("test5", this.item5, this);
        let item6 = new cc.MenuItemFont("test6", this.item6, this);
        let item7 = new cc.MenuItemFont("test7", this.item7, this);
        let item8 = new cc.MenuItemFont("test8", this.item8, this);

        item1.attr({x: -240, y: -200});
        item2.attr({x: -160, y: -200});
        item3.attr({x: -80, y: -200});
        item4.attr({x: 0, y: -200});
        item5.attr({x: 80, y: -200});
        item6.attr({x: 160, y: -200});
        item7.attr({x: -240, y: -240});
        item8.attr({x: -160, y: -240});

        let menu = new cc.Menu(item1, item2, item3, item4, item5, item6, item7,item8);
        this.addChild(menu);

        return true;
    },
    item1: function () {
        this.sprite.runAction(
            cc.place(new cc.Point(this.sprite.x - 100, this.sprite.y - 400))
        );
    },
    item2: function () {
        this.isFlipY = !this.isFlipY;
        this.sprite.runAction(
            cc.flipY(this.isFlipY)
        );
    },
    item3: function () {
        this.isShow = !this.isShow;
        this.sprite.runAction(
            this.isShow ? cc.show() : cc.hide()
        )
    },
    item4: function () {
        let storage = cc.sys.localStorage;
        storage.setItem("stage", "4");
        storage.setItem("username", "benson");
    },
    item5: function () {
        let storage = cc.sys.localStorage;
        let stage = storage.getItem("stage");
        let username = storage.getItem("username");
        cc.log(stage + ":" + username);
    },
    item6: function () {
        let storage = cc.sys.localStorage;
        storage.removeItem("stage");
        storage.removeItem("username");
    },
    item7: function () {
        cc.spriteFrameCache.addSpriteFrames(res.s1_plist);

        let animFrames = [];
        for (let i = 1; i <= 25; i++) {
            let str = "s1_00" + (i >= 10 ? "" : "0") + i + ".png";
            let frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        let sprite = new cc.Sprite(animFrames[0]);
        sprite.attr({
            x: 160,
            y: cc.winSize.height / 2
        });
        this.addChild(sprite);

        let anim = new cc.Animation(animFrames, 1 / 15, 1);
        let anims = new cc.Animate(anim);
        sprite.runAction(cc.repeatForever(anims));

    },
    item8: function () {
        cc.director.pushScene(new Item8Scene());
    },
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});


