---
layout: default
---
<div data-role="page" data-url="about-page" id="about-page">
    <div class="ui-grid-b ui-responsive">
        <div class="ui-block-a"></div>
        <div class="ui-block-b">
            <div data-position="fixed" data-role="header">
                <h3 style="text-align:center;">About</h3><a class="ui-btn-left ui-btn ui-icon-back ui-btn-icon-notext ui-corner-all" data-rel="back" href="#">Back</a>
            </div>
            <div class="ui-content" role="main">
                <div style="text-align:center;">
                    <canvas height="1000" id="canv" style="width:20%; height:20%" width="1000">
                        <img alt="VPH" height="20%" src="/css/images/logo.png" width="20%">
                    </canvas>
                    <br>
                    <br>
                    Special Thanks
                    <br>
                    <br>
                    God
                    <br>
                    Kris Ann Tacluyan
                    <br>
                    Target Display Co., Inc.
                    <br>
                    To my family
                    <br>
                    To All
                    <br>
                    <br>
                    <br>
                    Data gather from Comelec's <a href="http://www.comelec.gov.ph/?r=Archives/RegularElections/2016NLE/Candidates/">
                    Certified List of Candidates</a> as of March 3, 2016<br>
                </div>
            </div>
            <div data-position="fixed" data-role="footer" style= "text-align:center;">
                Copyright &copy; 2016 Renil Tanjeco. All Rights Reserved
            </div>
        </div>
        <div class="ui-block-c"></div>
    </div>
</div>
<script>
var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
var ox = 0;
var oy = 0;
var x = canvas.width;
var y = canvas.height;
ctx.font = "20px Arial";
ctx.beginPath();
ctx.moveTo(ox, (y / 2) + oy);
ctx.lineTo((x) + ox, (y / 2) + oy);
ctx.lineTo((x / 2) + ox, oy);
ctx.lineTo(ox, (y / 2) + oy);
ctx.fillStyle = "red";
ctx.fill();
ctx.beginPath();
ctx.moveTo((x / 2) + ox, (y / 2) + oy);
ctx.arc((x / 2) + ox, (y / 2) + oy, (x * .4), 0, Math.PI);
ctx.lineTo((x / 2) + ox, (y / 2) + oy);
ctx.fillStyle = "#ffe39f";
ctx.fill();
ctx.beginPath();
ctx.moveTo((x / 2) + ox, ((y * 3) / 4) + oy);
ctx.arc((x / 2) + ox, ((y * 3) / 4) + oy, (x * .1), 0, Math.PI);
ctx.lineTo((x / 2) + ox, ((y * 3) / 4) + oy);
ctx.fillStyle = "black";
ctx.fill();
ctx.textAlign = "center";
ctx.font = "100px Arial";
ctx.fillText("VPH", (x / 2) + ox, y);
</script>
