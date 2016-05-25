/* globals windows, jQuery, THREE   */

/*
function createGeometry ( sizing ) {

    var geometry = new THREE.CylinderGeometry(
        5,                       // radiusTop
        5,                       // radiusBottom
        sizing.height,           // height
        8,                       // radiusSegments
        sizing.segmentCount * 3, // heightSegments
        true                     // openEnded
    );

    for ( var i = 0; i < geometry.vertices.length; i ++ ) {

        var vertex = geometry.vertices[ i ];
        var y = ( vertex.y + sizing.halfHeight );

        var skinIndex = Math.floor( y / sizing.segmentHeight );
        var skinWeight = ( y % sizing.segmentHeight ) / sizing.segmentHeight;

        geometry.skinIndices.push( new THREE.Vector4( skinIndex, skinIndex + 1, 0, 0 ) );
        geometry.skinWeights.push( new THREE.Vector4( 1 - skinWeight, skinWeight, 0, 0 ) );

    }

    return geometry;

}
*/

/*
function createBones () {
    var prevBone = new THREE.Bone();
    bones.push( prevBone );
    prevBone.position.y = - sizing.halfHeight;

    var bone = new THREE.Bone();
    bone.position.y = sizing.segmentHeight;
    bones.push( bone );
    prevBone.add( bone );
    prevBone = bone;
}

function createMesh ( geometry, bones ) {

    var material = new THREE.MeshPhongMaterial( {
        skinning : true,
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
    } );

    var mesh = new THREE.SkinnedMesh( geometry,	material );
    var skeleton = new THREE.Skeleton( bones );

    mesh.add( bones[ 0 ] );

    mesh.bind( skeleton );

    skeletonHelper = new THREE.SkeletonHelper( mesh );
    skeletonHelper.material.linewidth = 2;
    scene.add( skeletonHelper );

    return mesh;

};

*/

var BodyWidth = 60;
var BodyLength = 80;
var BodyThickness = 10;
var LegLength = 20;

var MetalMaterial = new THREE.MeshStandardMaterial({ color: 0xce9421, transparent: true, opacity: 0.7 });

var RobotSim = function ( scene ) {

    // Light up
    var ambient = new THREE.AmbientLight( 0x555555 )
    ambient.name = "環境光源";
    scene.add(ambient);
    
    var light = new THREE.PointLight( 0xAAAAAA, 1);
    light.name = "投射燈";
    light.position.set( 0, 200, 0);
    scene.add( light );

    var geometry = new THREE.BoxGeometry(BodyWidth, BodyThickness, BodyLength);
    
    this.BodyMesh = new THREE.SkinnedMesh(geometry, MetalMaterial);
    this.BodyMesh.name = "身體";
    
    this.leftShoulder = new THREE.Bone();
    this.leftShoulder.name = "左肩膀";
    this.rightShoulder = new THREE.Bone();
    this.rightShoulder.name = "右肩膀";
    this.leftElbow = new THREE.Bone();
    this.leftElbow.name = "左肘";
    this.rightElbow = new THREE.Bone();
    this.rightElbow.name = "右肘";
    this.leftHip = new THREE.Bone();
    this.leftHip.name = "左髖部";
    this.rightHip = new THREE.Bone();
    this.rightHip.name = "右髖部";
    this.leftLeg = new THREE.Bone();
    this.leftLeg.name = "左腳";
    this.rightLeg = new THREE.Bone();
    this.rightLeg.name = "右腳";
    
    var bones = [];
    
    this.leftShoulder.position.x = BodyWidth / 2;
    this.leftShoulder.position.z = BodyLength / 2;
    this.leftShoulder.add( this.leftElbow );
    
    this.rightShoulder.position.x = -BodyWidth / 2;
    this.rightShoulder.position.z = BodyLength / 2;
    this.rightShoulder.add( this.rightElbow );
    
    this.leftHip.position.x = BodyWidth / 2;
    this.leftHip.position.z = -BodyLength / 2;
    this.leftHip.add( this.leftLeg );
    
    this.rightHip.position.x = -BodyWidth / 2;
    this.rightHip.position.z = -BodyLength / 2;
    this.rightHip.add( this.rightLeg );
    
    this.leftElbow.position.y = -LegLength;
    this.rightElbow.position.y = -LegLength;
    this.leftLeg.position.y = -LegLength;
    this.rightLeg.position.y = -LegLength;
    
    bones.push(this.leftShoulder);
    bones.push(this.rightShoulder);
    
    this.BodyMesh.add( this.leftShoulder );
    this.BodyMesh.add( this.rightShoulder );
    this.BodyMesh.add( this.leftHip );
    this.BodyMesh.add( this.rightHip );

    this.skeleton = new THREE.Skeleton( bones );
    this.BodyMesh.bind( this.skeleton );

    this.robotSkeleton = new THREE.SkeletonHelper( this.BodyMesh );
    this.robotSkeleton.material.linewidth = 2;
    this.robotSkeleton.name = "骨架";
    
    this.BodyMesh.translateY(LegLength);
    
    scene.add(this.BodyMesh);
    scene.add(this.robotSkeleton);
}
