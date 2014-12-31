
function parseField(field){
	return field.split(/\[|\]/).filter(function (s) {
		return s;
	});
}

function getField(req, field){
	var val = req.body;
	field.forEach(function (prop) {
		val = val[prop];
	});
	return val;
}

// 入力チェック
exports.require = function require(field){
	field = parseField(field);

	return function(req, res, next) {
		if(getField(req, field)){
			next();
		} else {
			res.error(field.join(" ") + "を入力してください");
			res.redirect('back');
		}
	};
};

// 入力文字数チェック
exports.lengthAbove = function lengthAbove(field, len){
	field = parseField(field);

	return function (req, res, next) {
		if(getField(req, field).length > len){
			next();
		} else {
			res.error(field.join(" ") + len + "文字以上で入力してください");
			res.redirect('back');
			return;
		}
	};
};