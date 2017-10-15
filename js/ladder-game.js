var parseIntWithoutPx = function(val) {
	return parseInt(val.replace('px', ''), 10);
};

var $ladder = null;
var $mascot = null;

var tr = 0;
var td = 0;

var exid = null;
var sway = null;

var move = function() {
	
	if($mascot == null) {
		alert('마스코트를 선택하세요.');
		return;
	}
	var $r = $ladder.find('tr').eq(tr).find('td').eq(td);
	var $l = $ladder.find('tr').eq(tr).find('td').eq(td - 1);
	
	// down
	gogo($mascot, 4, function() {
		if($r.length == 0) {
			$l.addClass('rway');
		}else {
			$r.addClass('lway');
		}
		
		if($r.hasClass('lean')) {
			// right
			gogo($mascot, 3, function() {
				$r.addClass('sway');
				td += 1;
				tr += 1;
			});
		}else if(td > 0 && $l.hasClass('lean')) {
			// left
			gogo($mascot, 1, function() {
				$l.addClass('sway');
				td -= 1;
				tr += 1;
			});
		}else {
			tr += 1;
		}
	});
	
};

var gogo = function($mascot, direction, callback) {
	
	var option = new Object();
	
	if(direction == 1) {
		option.left = (parseIntWithoutPx($mascot.css('left')) - sway) + 'px';
	}else if(direction == 2) {
		option.top = (parseIntWithoutPx($mascot.css('top')) - exid) + 'px';
	}else if(direction == 3) {
		option.left = (parseIntWithoutPx($mascot.css('left')) + sway) + 'px';
	}else if(direction == 4) {
		option.top = (parseIntWithoutPx($mascot.css('top')) + exid) + 'px';
	}
	
	$mascot.animate(option, 300, 'easeInQuad', function() {
		callback();
	});
};


$(function() {
	
	// 사다리
	$ladder = $('#ladder > table > tbody');
	
	exid = parseIntWithoutPx($('#ladder td:first').css('height')) + 3;
	sway = parseIntWithoutPx($('#ladder td:first').css('width')) + 4;
	
	var pos = $('#ladder tr td:first').offset();
	
	$('.mascot').each(function(idx, obj) {
		var $this = $(obj);
		$this.css('top' , (pos.top  - parseIntWithoutPx($this.css('height')) / 2) + 'px'); 
		$this.css('left', (pos.left + (sway * idx) - parseIntWithoutPx($this.css('width')) / 2) + 'px');
	});

	$('.mascot').click(function() {
		$mascot = $(this);
		tr = 0;
		td = $(this).data('no');
		
		var maximum = $ladder.find('tr').length;
		var running = 0;
		var race = setInterval(function() {
			if(running == maximum) {
				clearInterval(race);
			}else if(running == tr) {
				running += 1;
				move();
			}
		}, 10);
	});
	
	/*
	$('body').keydown(function(jevent) {
		
		jevent.stopPropagation();
		jevent.stopImmediatePropagation();
		
		var cursor = jevent.which;
		
		// LEFT TOP RIGHT DOWN 
		//   37  38    39   40

		if(cursor == 37 || cursor == 38 || cursor == 39 || cursor == 40) {

			var option = new Object();
			
			if(cursor == 37) {
				option.left = (parseIntWithoutPx($mascot.css('left')) - sway) + 'px';
			}else if(cursor == 38) {
				option.top = (parseIntWithoutPx($mascot.css('top')) - exid) + 'px';
			}else if(cursor == 39) {
				option.left = (parseIntWithoutPx($mascot.css('left')) + sway) + 'px';
			}else if(cursor == 40) {
				option.top = (parseIntWithoutPx($mascot.css('top')) + exid) + 'px';
			}
			
			$mascot.animate(option, 500, 'linear');
		}
	});
 	*/
});
