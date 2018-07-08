var Item9Layer = cc.Layer.extend({
    sprite: null,
    space: null,
    ctor: function () {
        this._super();

        this.initPhysics();
        this.setUpmymouse(this);
        this.scheduleUpdate();
        return true;
    },

    initPhysics: function () {
        this.space = new cp.Space();
        this.space.gravity = cp.v(1000, -9800);

        var staticBody = this.space.staticBody;
        var walls = [
            new cp.SegmentShape(staticBody, cp.v(0, 0),
                cp.v(cc.winSize.width, 0), 0),
            new cp.SegmentShape(staticBody, cp.v(0, 0),
                cp.v(0, cc.winSize.height), 0),
            new cp.SegmentShape(staticBody, cp.v(0, cc.winSize.height),
                cp.v(cc.winSize.width, cc.winSize.height), 0),
            new cp.SegmentShape(staticBody, cp.v(cc.winSize.width, cc.winSize.height),
                cp.v(cc.winSize.width, 0), 0),
        ];

        for (var i = 0; i < walls.length; i++) {
            var wall = walls[i];
            wall.setElasticity(0.5);
            wall.setFriction(10);
            this.space.addStaticShape(wall);
        }


        //stick2
        let stick2 = new cc.DrawNode();
        stick2.drawSegment(cc.p(cc.winSize.width / 2, cc.winSize.height / 2),
            cc.p(cc.winSize.width / 2, 0),
            4,
            cc.color(255, 0, 0)
        );
        this.addChild(stick2);

        let staticBody2 = this.space.staticBody;
        let shape2 = new cp.SegmentShape(staticBody2,cp.v(cc.winSize.width / 2, cc.winSize.height / 2),
            cp.v(cc.winSize.width / 2, 0),4);
        shape2.setElasticity(0.5);
        shape2.setFriction(10);
        this.space.addStaticShape(shape2);


        //stick3
        let stick3 = new cc.DrawNode();
        stick3.drawSegment(cc.p(cc.winSize.width / 2+200, cc.winSize.height / 2),
            cc.p(cc.winSize.width , cc.winSize.height / 2),
            4,
            cc.color(255, 255, 0)
        );
        this.addChild(stick3);

        let staticBody3 = this.space.staticBody;
        let shape3 = new cp.SegmentShape(staticBody3,cp.v(cc.winSize.width / 2+200, cc.winSize.height / 2),
            cp.v(cc.winSize.width , cc.winSize.height / 2),4);
        shape3.setElasticity(0.5);
        shape3.setFriction(10);
        this.space.addStaticShape(shape3);

        //stick4
        let stick4 = new cc.DrawNode();
        stick4.drawSegment(cc.p(cc.winSize.width / 2, cc.winSize.height / 2),
            cc.p(0 , 0),
            4,
            cc.color(0, 255, 0)
        );
        this.addChild(stick4);

        let staticBody4 = this.space.staticBody;
        let shape4 = new cp.SegmentShape(staticBody4,cp.v(cc.winSize.width / 2, cc.winSize.height / 2),
            cp.v(0 , 0),4);
        shape4.setElasticity(0.5);
        shape4.setFriction(0);
        this.space.addStaticShape(shape4);



    },

    setUpmymouse: function (layer) {
        if ('mouse' in cc.sys.capabilities) {
            // define listener object
            let mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    layer.addBox(event.getLocation());
                },
            };
            cc.eventManager.addListener(mouseListener, this);
        }
    },

    addBox: function (p) {

        let body = new cp.Body(1, cp.momentForBox(1, 64, 64));
        body.setPos(p);
        this.space.addBody(body);

        let shape = cp.BoxShape(body, 64, 64);
        shape.setElasticity(0.5);
        shape.setFriction(1);
        this.space.addShape(shape);

        var boxSprite = new cc.PhysicsSprite(res.box);
        boxSprite.setBody(body);
        boxSprite.setPosition(cc.p(p.x, p.y));
        this.addChild(boxSprite);

    },

    update: function () {
        this.space.step(0.01);
    }


});

var Item9Scene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new Item9Layer();
        this.addChild(layer);
    }
});
