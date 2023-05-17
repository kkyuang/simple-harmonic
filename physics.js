//상수 정의
//화면비 관련 상수
const x_min = -4;
const x_max = 4;
const y_min = -3;
const y_max = 3;

const screen_x = 400;
const screen_y = 300;

const deltatime = 0.03;

//그래프 관련 상수
const g_x_min = 0
const g_x_max = 100
const g_y_min = -4
const g_y_max = 4
const g_screen_x = 400;
const g_screen_y = 300;

$(document).ready(() => {
    console.log("gg")
    var canvas = $("#shm_cvs")[0];
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");
        playSHM();
    }
})

function playSHM(){
    var canvas = $("#shm_cvs")[0];
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");
        //물리량 변수
        var acc = 0;
        var velocity = 0;
        var x = 3;
        var m = 1;
        var k = 1;
        var t = 0;
        var r = 10;
        setInterval(() => {
            acc = -(k*x)/m - (velocity)*r*deltatime
            velocity += acc * deltatime
            x += velocity * deltatime
            t += deltatime
            screenClear(ctx, canvas);
            drawCircle(ctx, x, 0)
            pointGraph(t, x)
        }, deltatime)
    }
}



//화면삭제 테스트
$(document).mousedown(() => {
    var canvas = $("#shm_cvs")[0];
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");
        //screenClear(ctx, canvas);
    }
})

//실제 좌표를 화면 좌표로 변환
function cvt_RtoS(x, y){
    xcv = ((x - x_min ) / (x_max - x_min)) * screen_x
    ycv = (1 - ((y - y_min ) / (y_max - y_min))) * screen_y
    return {x: xcv, y: ycv}
}

//원 그리기
function drawCircle(ctx, x, y){
    ctx.fillStyle = "rgb(200,0,0)";
    pnt = cvt_RtoS(x, y);
    ctx.arc(pnt.x, pnt.y, 20, 0, 2*Math.PI);
    ctx.fill();
}

//화면 초기화
function screenClear(ctx, cnvs){
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    ctx.beginPath();
}

//그래프 그리기
function pointGraph(x, y){
    var graph = $("#graph_cvs")[0];
    var g_ctx = graph.getContext("2d");
    xcv = ((x - g_x_min ) / (g_x_max - g_x_min)) * g_screen_x
    ycv = (1 - ((y - g_y_min ) / (g_y_max - g_y_min))) * g_screen_y
    g_ctx.arc(xcv, ycv, 2, 0, 2*Math.PI);
    g_ctx.fill();
    g_ctx.beginPath();
}