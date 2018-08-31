// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default class Base {
     static isStart=false;
        static timev:number=60;
        static isPull=false;
        static srcx:number=0;
        static srcy:number=0;
        static seq:cc.ActionInterval;
        static isclick=false;
        static allcount=3;
        static currentcount=0;
        static score=0;
        static life=100;

        static setMove(y:number){
            
            this.seq=cc.repeatForever(
                cc.sequence(
                    cc.moveTo(5,cc.winSize.width/2+20, y),
                    cc.moveTo(5,-cc.winSize.width/2-20,y)
                ));
        }

        static getMove(){
            return this.seq;
        }
         

}
