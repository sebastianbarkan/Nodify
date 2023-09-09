pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/comparators.circom";

// check the Euclidean distance is within 0.1 degree
// X Latitude: 1 deg = 110.574 km
// Y Longitude: 1 deg = 111.320*cos(latitude) km


template GeoConstraint(n) {
    signal input x0;
    signal input y0;
    signal input x1;
    signal input y1;
    
    signal x_dist;
    signal x_dist2;

    signal y_dist;
    signal y_dist2;

    signal xy_dist2;

    signal output xy_out;


    var xy_dist = 1000000;

    // Define the abs(x_diff) < 0.1 degree in latitude
    x_dist <== x1 - x0; 
    x_dist2 <== x_dist*x_dist; 

    y_dist <== y1 - y0; 
    y_dist2 <== y_dist*y_dist; 

    xy_dist2 <== x_dist2 + y_dist2;

    component lessThan = LessThan(n);

    lessThan.in[0] <-- xy_dist2;
    lessThan.in[1] <-- xy_dist;

    xy_out <== lessThan.out;
}

component main = GeoConstraint(64);