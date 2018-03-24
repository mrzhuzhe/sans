(function(window, undefined){
	
	var _fetchExcel = {
		rABS: false, // true: readAsBinaryString ; false: readAsArrayBuffer
		zip: null,	// download zip file obj
		downloadConteng: null,
		handleFile: function (e) {
		  var files = e.target.files, f = files[0];
		  var rABS = this.rABS;
		  var reader = new FileReader();
		  downloadloading.style.display = "block";
		  reader.onload = e => {
		    var data = e.target.result;
		    if(!rABS) data = new Uint8Array(data);		    
		    var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
		    this.zip = new JSZip();
		    /* DO SOMETHING WITH workbook HERE */
		    this.fetchData(workbook)
		  };
		  if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
		},
		fetchData: function(data) {
			var _emu = ["省份","城市","运营商","号段"];			
			//var _result = [];
			for (var key in data.Sheets) {
				var sheet = data.Sheets[key];
				// TODO here can be optimized iteration 1
				var _json = XLSX.utils.sheet_to_json(sheet);
				// iteration 2 
				_json.forEach((e, i) => {
					var _res = this.generrate_txt({
						title: _emu.map(item => e[item]).join('-') , 
						number: e[_emu[3]]
					})
					this.zip.file(_res.title, _res.data);		
					/* _result.push() */
				})									
			}
			
			this.zip.generateAsync({type:"blob"}).then(content => {
			    // see FileSaver.js
			    this.downloadConteng = content;
			    console.log(downloaEexcelBtn)
			    downloaEexcelBtn.style.display = "block";
			    downloadloading.style.display = "none";
			    //saveAs(content, "tel.zip");
			});
			//	console.log(_result)
		},
		downloadFileHandler: function() {
			saveAs(this.downloadConteng, "tel.zip");
		},
		generrate_txt: function(opt) {
			opt.number *= 10000;
			//opt.data = [];
			opt.data = "";
			// iteration3
			for (var i=0;i<9999;i++){
				//opt.data.push(opt.number + i)
				opt.data += (opt.number + i) + "\r\n";
			}			
			return opt
		}
	}
	

	// bind events
	var excelfileObj = document.getElementById("excelfile");
	excelfileObj.addEventListener('change', _fetchExcel.handleFile.bind(_fetchExcel), false);

	var downloaEexcelBtn = document.getElementById("downloadexcel");
	downloaEexcelBtn.addEventListener('click', _fetchExcel.downloadFileHandler.bind(_fetchExcel), false);

	var downloadloading = document.getElementById("downloadloading");

})(window)