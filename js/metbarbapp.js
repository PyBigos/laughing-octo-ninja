require([
   "dojo/parser",
   "dojo/_base/connect",
   "dojo/dom",
   "dojo/on",
   "dojo/_base/array",



   "esri/map",
   "esri/toolbars/navigation",
   "esri/layers/ArcGISDynamicMapServiceLayer",
   "esri/layers/FeatureLayer",
   "esri/symbols/SimpleMarkerSymbol",
   "esri/symbols/SimpleLineSymbol",
   "esri/dijit/Legend",
   "esri/tasks/FeatureSet",
   "esri/graphic",
   "esri/tasks/Geoprocessor",
   "esri/toolbars/draw",
   "esri/dijit/editing/Editor",
   "esri/tasks/QueryTask",
   "esri/tasks/query",
   "esri/renderers/ClassBreaksRenderer",
   "esri/symbols/Font",
   "esri/symbols/TextSymbol",
   "esri/symbols/PictureMarkerSymbol",
   "esri/renderers/SimpleRenderer",
   "esri/renderers/UniqueValueRenderer",

   "dojo/_base/Color",
   "dojo/_base/fx",
   "dojo/ready",
   "dijit/dijit",
   "dijit/layout/ContentPane",
   "dijit/form/Button",
   "dijit/layout/ContentPane",
   "dijit/layout/AccordionContainer",
   "dijit/form/HorizontalSlider",
   "dijit/form/HorizontalRule",
   "dijit/form/HorizontalRuleLabels",
   "dijit/form/DropDownButton",
   "dojox/layout/FloatingPane"
  ],
    function (parser, connect, dom, on, array, map, nav, dynLayer,
        featLayer, SimpleMarkerSymbol, SimpleLineSymbol, legend, featSet, graphic,
        gp, esriDraw, editor, qTask, Query, classBreakRen, Font, TextSym, picsymbol, simpr, uvren,
        Color, fx, ready) {

        parser.parse();
        



        var map = new map("map", {
            basemap: "gray",
            zoom: 4,
            center: [-98, 40],
        });


        //d3.select("body").transition().style("background-color", "grey");




        //Grab featurelayers
        //Metar layer
        var metLyr = new featLayer("http://jeffb:6080/arcgis/rest/services/Flight/FlightHourlymets/MapServer/0");
        //http://services.arcgis.com/SgB3dZDkkUxpEHxu/arcgis/rest/services/FlightHourly/FeatureServer/2
        
		map.addLayer(metLyr);
        function proc(res){
        
            {			
            			
                        //Create the unique value ren
						defSym = new picsymbol("http://jeffb/javascriptApps/Javascript/images/circle-green-16x16.png",3,3);
						var uniqueRen = new uvren(defSym,"webimage");
						uniqueRen.rotationInfo = {field:"wind_dir_degrees",type:"geographic"}
							//console.log(res)
							//features.featureSet.features.forEach(function(feat){
						//		var grph = new graphic(feat.geometry,markerSym,feat.attrubutes,pop);
								//console.log(feat);
								//graphRes.push(grph)
						//		this.inMap.graphics.graphics.add(grph);
                
                        var resultFeatures = res.featureSet.features;
                
                        for (var i=0, il=resultFeatures.length; i<il; i++){
                        
                            feat = resultFeatures[i]
                            if(feat.attributes.webimage != null){
                                picSym = new picsymbol(feat.attributes.webimage, 15,25);
						
							
								//Add a value to the renderer
								uniqueRen.addValue(feat.attributes.webimage,picSym);
                            
                            
                            }
                            //else{
                              //  picSym = new picsymbol("http://jeffb/javascriptApps/Javascript/images/circle-green-16x16.png",24,24);
                               // uniqueRen.addValue("imagenotavail",picSym);
                            //}
                        
                        
                        }
                
                
                
						
                            
							//Create the picture symbol
							
						//});
						
							console.log(uniqueRen);
							
							//
							console.log(metLyr.renderer);
							
							//uniqueRen.setRotationInfo({field:"wind_dir_degrees"});
							metLyr.setRenderer(uniqueRen);
							metLyr.redraw();
							
						}
        
        }





        var simpSym = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255, 0, 0]), 1),
            new Color([0, 255, 0, 0.25]));

        var feats;

		
		map.on("layer-add",function(){console.log("agol added")})
		
		
		
        //metLyr.on("load", function () {
			
						console.log("layer loaded");
					
            //Connect the click for metarwinds
            //on(dom.byId("barb"), "click", function () {

						
						//Build the Querytask on the summ table
						var imageSymTask = new qTask("http://jeffb:6080/arcgis/rest/services/Flight/FlightHourlymets/MapServer/0");
						
						var imageSymParam = new Query();
						imageSymParam.where = "1=1";
						imageSymParam.outFields = ["webimage"];
                        imageSymParam.returnGeometry = true;
                
						
                        imageSymTask.on("complete",proc);
                
						imageSymTask.execute(imageSymParam);
            //});


        //});

    });








