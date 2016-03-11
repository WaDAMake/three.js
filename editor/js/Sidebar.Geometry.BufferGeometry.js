/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Geometry.BufferGeometry = function ( editor ) {

	var signals = editor.signals;

	var container = new UI.Row();

	function update( object ) {

		if ( object === null ) return;

		var geometry = object.geometry;

		if ( geometry instanceof THREE.BufferGeometry ) {

			container.clear();
			container.setDisplay( 'block' );

			var index = geometry.index;

			if ( index !== null ) {

				var panel = new UI.Row();
				panel.add( new UI.Text( 'index' ).setWidth( '90px' ) );
				panel.add( new UI.Text( ( index.count ).format() ).setFontSize( '12px' ) );
				container.add( panel );

			}

			var attributes = geometry.attributes;

			for ( var name in attributes ) {

				var attribute = attributes[ name ];

				var panel = new UI.Row();
				panel.add( new UI.Text( name ).setWidth( '90px' ) );
				panel.add( new UI.Text( ( attribute.count ).format() + ' (' + attribute.itemSize + ')' ).setFontSize( '12px' ) );
				container.add( panel );

			}

			var priceRow = new UI.Row();
			var price = new UI.Text('n/a');
			
			priceRow.add(new UI.Text('Price:').setWidth( '90px'));
			priceRow.add(price);
			container.add(priceRow);
			
			var areaValue = geometry.computeSurfaceArea(object.rotation);
			var volumeValue = geometry.computeVolume();
			
			var loops = 3;
			var layerHeight = 0.25;
			var nozzle = 0.4
			var perimeterSpeed = 30;
			var infilledSpeed = 55;
			var infilledPercent = 0.15;
			var unitPrice = 200;
			
			volumeValue -= layerHeight * loops * nozzle;
			var priceValue = (areaValue / (layerHeight * perimeterSpeed)) * loops + (volumeValue * infilledPercent) / (layerHeight * nozzle * infilledSpeed);

			price.setValue(parseInt(priceValue / 3600 * unitPrice));
			
			container.add(new UI.Text('Supported Area: ' + parseInt(geometry.supportedArea)));
			container.add(new UI.Break());
			container.add(new UI.Text('Area: ' + parseInt(areaValue)));
			container.add(new UI.Break());
			container.add(new UI.Text('Volume: ' + parseInt(volumeValue)));
		} else {

			container.setDisplay( 'none' );

		}

	}

	signals.objectSelected.add( update );
	signals.geometryChanged.add( update );

	return container;

};
