function erm(text){
	var temp = text.split('');
	var arr = [];
	for(var i = 0; i<temp.length; i++){
		switch(temp[i]){
			case 'a':
				arr.push('er');
				break;
			case 'e':
				arr.push('e');
				break;
			case 'i':
				arr.push('eh');
				break;
			case 'o':
				arr.push('er');
				break;
			case 'u':
				arr.push('eh');
				break;
			default:
				arr.push(temp[i]);
				break;
		}
	}
	var ermahgerdArray =  arr.join('').split(' ');
	var arr2 = [];
	for(var j = 0; j<ermahgerdArray.length; j++){
		ermahgerdArray[j] = ermahgerdArray[j].replace('ereh', 'er').replace('erer' , 'er').replace('my', 'mah').replace('eheh', 'eh').replace('eher', 'eh').replace('rr', 'r').replace('ee','e');
		arr2.push(ermahgerdArray[j]);
	}
	var ermahgerdText = ermahgerdArray.join(' ');
	return ermahgerdText;
}

module.exports = erm;
