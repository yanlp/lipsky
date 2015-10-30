$(function() {
	/*清除input的内容*/
	$('.btn-cls').on("click", function() {
		var self = $(this);
		debugger;
		self.prev().val("");
		self.removeClass('show-clear');
	});
	var GerneraIcon = {
		borderwidth: 0,
		borderColor: null,
		borderWObj: $(".ipt-wid input"),
		borderCObj: $(".ipt-clr input"),
		btnCls: ".btn-cls",
		shwCls: 'show-clear',
		iconWpCls: '.angle_icon',
		iconStylyCls: '.icon_style',
		btnObj: $(".btn-geration"),
		containWrap: $('.triangle-wrap'),
		init: function() {
			var self = this;
			var flag = self.matchWidth();
			var flagC = self.matchColor();
			self.renderTriangle();
			/*self.bindHandler();*/
		},
		getWidth: function() {
			var self = this;
			self.borderwidth = self.borderWObj.val();
			return self.borderwidth;
		},
		getColor: function() {
			var self = this;
			self.borderColor = self.borderCObj.val();
			return self.borderColor;
		},
		/*匹配宽度值*/
		matchWidth: function() {
			var self = this;
			var width = self.getWidth();
			var match;
			match = width.match(/^(\d+(px|pc|em|rem|mm|%)\s*)$/);
			if (match) {
				return true;
			} else {
				return false;
			}
		},
		/*匹配颜色值*/
		matchColor: function() {
			var self = this;
			var color = self.getColor();
			var match16 = color.match(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)|(^red|white|blue$)/g),
				matchRGB = color.match(/^[rR][gG][bB][\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?){1}(\s*)[\)]$/),
				matchRGBA = color.match(/^[Rr][Gg][Bb][Aa][\(](\s*(\d|1\d|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,){3}\s*((0?\.[1-9]{1,3})|([01]))\s*[\)]$/g);
			if (match16 || matchRGB || matchRGBA) {
				return true;
			} else {
				return false;
			}

		},
		/*渲染各种三角*/
		renderTriangle: function() {
			var self = this,
				cssText = "",
				cssTextValue = "",
				TriWidth,
				TriColor,
				triangleObj = self.containWrap.find(self.iconWpCls),
				styleObj = self.containWrap.find(self.iconStylyCls);
			if (!self.matchWidth()) {
				alert("请输入正确的宽度值");
				return false;
			}
			if (!self.matchColor()) {
				alert("请输入正确的颜色值");
				return false;
			}
			TriWidth = self.getWidth();
			TriColor = self.getColor();
			var triangelStyle = "display:inline-block;\n\twidth:0;height:0;\n\tfont-size:0;\n\tline-height:0;\n\toverflow:hidden;\n\t",
				extendStyle = {
					a: "border-width:" + TriWidth + ";border-color:" + TriColor + " transparent transparent transparent;border-style:solid;",
					b: "border-width:" + TriWidth + ";border-color:transparent  transparent " + TriColor + " transparent;border-style:solid;",
					c: "border-width:" + TriWidth + ";border-color:transparent " + TriColor + " transparent transparent;border-style:solid;",
					d: "border-width:" + TriWidth + ";border-color:transparent  transparent transparent " + TriColor + ";border-style:solid;",
					e: "border-width:" + TriWidth + " " + TriWidth + " 0 0;border-color:" + TriColor + " transparent  transparent transparent ;border-style:solid;",
					f: "border-width:" + TriWidth + " " + TriWidth + " 0 0;border-color: transparent " + TriColor + " transparent transparent ;border-style:solid;",
					g: "border-width:" + TriWidth + " 0  0 " + TriWidth + ";border-color: transparent  transparent transparent " + TriColor + " ;border-style:solid;",
					h: "border-width:" + TriWidth + " 0 0 " + TriWidth + ";border-color: " + TriColor + "  transparent transparent transparent ;border-style:solid;"
				};
			if(triangleObj.find('li').length>0){triangleObj.html("");}
			if($('#tempStyle').length >0){$('#tempStyle').remove();}
			for (var i in extendStyle) {
				$('<li class='+i+'><span></span></li>').appendTo(triangleObj);
				cssText += "\n\t"+self.iconWpCls+" ."+i+" span {" + extendStyle[i].replace(/;/g,";\n\t") + "}\n\t";
				cssTextValue = '.iconTriangle {\n\t' + triangelStyle + extendStyle[i].replace(/;/g,";\n\t") + "\n}";
				$(self.iconStylyCls +' .'+i +' pre').html(cssTextValue);
			}
			$('head').append($('<style id="tempStyle">'+cssText+'</style>'));
			var maxWidth = Math.max($(self.iconWpCls).find('li').width(),$(self.iconWpCls).find('li').height());
			$(self.iconWpCls).find('li').width(maxWidth);
			$(self.iconWpCls).find('li').height(maxWidth);
			self.containWrap.removeClass('hide-wrap');

		}
	};

	GerneraIcon.btnObj.on('click', function(event) {
		event.preventDefault();
		/* Act on the event */

		GerneraIcon.init();
	});
	$('.angle_icon li').live('click',function(){
		var index = $(this).index();
		$('.icon_style li').eq(index).removeClass('pos-hide').siblings().addClass('pos-hide');
	});
	$('.icon_style .btn-cp').zclip({
        path: 'ZeroClipboard.swf',
        copy: function(){//复制内容
            return $(this).prev().text();
        },
        afterCopy: function(){//复制成功
           alert("复制成功");
        }
    });
	$('.ipt').on("change keyup", function() {
		var self = $(this);
		var value = self.val();
		var siblings = self.siblings('.btn-cls');
		var flag = siblings.hasClass('show-clear');
		if(!value){
			siblings.removeClass('show-clear');
			$(this).zclip("show");
		} else{
			siblings.addClass('show-clear');
		}
	});

    function deleteSpace(str){
    	return str.replace(/^\s+|\s+$/g,"");
    }
    $('.ipt').on('keydown',function(e){
    	if(e.keyCode == 13){
    		$('.ipt').each(function(index, el) {
    			var returnVal = deleteSpace($(this).val());
    			$(this).val(returnVal);
    		});
    	GerneraIcon.init();
    	}
    });
    //重置

});