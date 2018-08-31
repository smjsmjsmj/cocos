const {ccclass, property} = cc._decorator;
import Base from "./base"

@ccclass
export default class main extends cc.Component {

    @property(cc.Label)
    life:cc.Label;

    @property(cc.Label)
    score:cc.Label;

    @property(cc.Node)
    startbtn:cc.Node;

    @property(cc.Node)
    pullbtn:cc.Node;

    @property(cc.Label)
    time:cc.Label;

    sg:cc.Node;

    

    start () {
        this.init();
    }
    onLoad(){
     
    }

    init(){
        
        this.life.string="100";
        this.score.string="0";
        this.time.string=Base.timev+"";
        this.sg=cc.find("Canvas/youxiqu/sg");
        this.startbtn.on(cc.Node.EventType.TOUCH_END, startTouch, self);
        this.pullbtn.on(cc.Node.EventType.TOUCH_END, pullTouch, self);
    }
  
    update(){
        if(Base.currentcount==Base.allcount){
            Base.isStart=false;
        }
    }
}
 

   

function startTouch(){
    
        if(!Base.isStart){
            var cyc=cc.find("Canvas/cyc").getComponent(cc.Sprite);
            var t=cc.find("Canvas/cyc/time").getComponent(cc.Label);
            var s=cc.find("Canvas/youxiqu/sg");
            s.x=Base.srcx;
            s.y=Base.srcy;
            t.string=Base.timev+"";
            Base.isStart=true;
            Base.setMove(-100);
            var finished = cc.callFunc(function () {
                s.runAction(Base.getMove());
            }, this, action);

            var action=cc.sequence(cc.moveTo(2,0,-100),finished);
            s.runAction(action);
           
            cyc.enabled=true;
            t.enabled=true;
            t.schedule(function(){
                var ti=t.string;
                if(Number(ti)<=0){
                    Base.isStart=false;
                    this.unschedule(this);
                    s.stopAction(Base.getMove());
                    return;
                }
                if(!Base.isPull){
                    t.string=Number(ti)-1+"";
                }
            }, 1);
            
        }     
}

function pullTouch(){

    var t=cc.find("Canvas/cyc/time").getComponent(cc.Label);
    if(Base.life<=0){
        alert("生命力不足，请重新开始");
        return;
    }
    if(!Base.isPull){
        Base.isPull=true;
        Base.life-=50;
        var lv=cc.find("Canvas/lifevalue").getComponent(cc.Label);
        lv.string=Base.life+"";
        var cyc=cc.find("Canvas/cyc").getComponent(cc.Sprite);
        var s=cc.find("Canvas/youxiqu/sg");
        Base.srcx=s.x;
        Base.srcy=s.y;
        s.stopAction(Base.getMove());
        var s=cc.find("Canvas/youxiqu/sg");
        var finished = cc.callFunc(function () {
            if(!Base.isclick){
                Base.setMove(-100);
                s.runAction(Base.seq);
            }else{
                Base.isclick=false;
            }
            Base.isPull=false;
        }, this, action);
        var action=cc.sequence(cc.moveTo(2,s.x,-cc.winSize.height/2),finished);
        s.runAction(action);
    }
    
}