var Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();



        return true;
    }
});

var Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Layer();
        this.addChild(layer);
    }
});

