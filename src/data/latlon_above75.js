const mask_gps = [[40.766, -73.958],
 [40.766, -73.955],
 [40.765, -73.955],
 [40.766, -73.954],
 [40.766, -73.977],
 [40.767, -73.969],
 [40.761, -73.958],
 [40.755, -73.966],
 [40.765, -73.962],
 [40.752, -73.98],
 [40.757, -73.961],
 [40.751, -73.969],
 [40.767, -73.965],
 [40.773, -73.965],
 [40.768, -73.967],
 [40.769, -73.97],
 [40.772, -73.977],
 [40.777, -73.987],
 [40.77, -73.952],
 [40.771, -73.956],
 [40.769, -73.959],
 [40.744, -73.971],
 [40.703, -73.99],
 [40.768, -73.956],
 [40.762, -73.95],
 [40.762, -73.964],
 [40.768, -73.961],
 [40.758, -73.962],
 [40.753, -73.986],
 [40.721, -73.965],
 [40.767, -73.968],
 [40.768, -73.963],
 [40.776, -73.911],
 [40.776, -73.91],
 [40.769, -73.961],
 [40.755, -73.968],
 [40.754, -73.97],
 [40.751, -73.971],
 [40.756, -73.97],
 [40.749, -73.973],
 [40.779, -73.958],
 [40.78, -73.96],
 [40.78, -73.961],
 [40.774, -73.964],
 [40.775, -73.963],
 [40.775, -73.961],
 [40.776, -73.961],
 [40.772, -73.963],
 [40.771, -73.962],
 [40.77, -73.962],
 [40.774, -73.954],
 [40.785, -73.947],
 [40.785, -73.946],
 [40.767, -73.98],
 [40.768, -73.981],
 [40.769, -73.982],
 [40.772, -73.99],
 [40.779, -73.985],
 [40.781, -73.981],
 [40.783, -73.98],
 [40.784, -73.98],
 [40.778, -73.982],
 [40.773, -73.982],
 [40.771, -73.98],
 [40.742, -73.961],
 [40.764, -73.974],
 [40.778, -73.963],
 [40.777, -73.961],
 [40.777, -73.962],
 [40.74, -73.976],
 [40.729, -73.984],
 [40.719, -73.991],
 [40.718, -73.992],
 [40.718, -73.994],
 [40.719, -73.995],
 [40.718, -73.995],
 [40.717, -73.995],
 [40.718, -73.996],
 [40.719, -73.996],
 [40.717, -73.997],
 [40.717, -73.998],
 [40.716, -73.998],
 [40.715, -73.998],
 [40.717, -74.0],
 [40.718, -74.0],
 [40.72, -74.001],
 [40.721, -74.001],
 [40.723, -73.999],
 [40.726, -73.995],
 [40.727, -73.994],
 [40.736, -73.99],
 [40.737, -73.989],
 [40.743, -73.982]];

const maskhole_gps = [[40.764, -73.958],
 [40.765, -73.958],
 [40.766, -73.956],
 [40.767, -73.953],
 [40.768, -73.953],
 [40.764, -73.956],
 [40.763, -73.957],
 [40.764, -73.96],
 [40.764, -73.965],
 [40.763, -73.965],
 [40.761, -73.966],
 [40.764, -73.967],
 [40.764, -73.969],
 [40.763, -73.97],
 [40.763, -73.971],
 [40.764, -73.971],
 [40.765, -73.976],
 [40.765, -73.972],
 [40.766, -73.971],
 [40.758, -73.967],
 [40.756, -73.965],
 [40.75, -73.97],
 [40.765, -73.963],
 [40.76, -73.97],
 [40.758, -73.971],
 [40.752, -73.975],
 [40.752, -73.976],
 [40.75, -73.977],
 [40.749, -73.978],
 [40.753, -73.981],
 [40.757, -73.982],
 [40.758, -73.982],
 [40.761, -73.98],
 [40.762, -73.975],
 [40.763, -73.974],
 [40.765, -73.966],
 [40.764, -73.964],
 [40.766, -73.962],
 [40.769, -73.967],
 [40.765, -73.97],
 [40.763, -73.961],
 [40.771, -73.954],
 [40.769, -73.958],
 [40.703, -73.994],
 [40.703, -73.993],
 [40.703, -73.991],
 [40.703, -73.989],
 [40.702, -73.987],
 [40.705, -73.988],
 [40.702, -73.991],
 [40.7, -73.988],
 [40.759, -73.962],
 [40.761, -73.961],
 [40.772, -73.964],
 [40.781, -73.95],
 [40.78, -73.95],
 [40.78, -73.951],
 [40.777, -73.952],
 [40.768, -73.96],
 [40.766, -73.964],
 [40.754, -73.992],
 [40.755, -73.994],
 [40.755, -73.999],
 [40.754, -74.001],
 [40.721, -73.961],
 [40.746, -73.972],
 [40.747, -73.971],
 [40.76, -73.964],
 [40.771, -73.969],
 [40.774, -73.969],
 [40.777, -73.91],
 [40.775, -73.912],
 [40.756, -73.967],
 [40.77, -73.961],
 [40.784, -73.947],
 [40.773, -73.991],
 [40.762, -73.943],
 [40.731, -73.983],
 [40.722, -74.0],
 [40.722, -73.999],
 [40.724, -73.998],
 [40.725, -73.996],
 [40.73, -73.991],
 [40.732, -73.99],
 [40.733, -73.99],
 [40.734, -73.99],
 [40.736, -73.989],
 [40.747, -73.979]];

const nomask_gps = [[40.763, -73.96],
 [40.764, -73.958],
 [40.763, -73.957],
 [40.764, -73.96],
 [40.763, -73.966],
 [40.761, -73.967],
 [40.765, -73.976],
 [40.765, -73.973],
 [40.765, -73.972],
 [40.766, -73.971],
 [40.766, -73.972],
 [40.767, -73.971],
 [40.758, -73.967],
 [40.756, -73.964],
 [40.754, -73.966],
 [40.75, -73.969],
 [40.768, -73.971],
 [40.758, -73.971],
 [40.752, -73.976],
 [40.751, -73.977],
 [40.749, -73.98],
 [40.746, -73.982],
 [40.756, -73.983],
 [40.757, -73.982],
 [40.758, -73.982],
 [40.759, -73.981],
 [40.76, -73.981],
 [40.761, -73.98],
 [40.762, -73.975],
 [40.763, -73.974],
 [40.762, -73.962],
 [40.766, -73.962],
 [40.772, -73.965],
 [40.773, -73.964],
 [40.756, -73.968],
 [40.76, -73.965],
 [40.749, -73.97],
 [40.775, -73.983],
 [40.703, -73.993],
 [40.703, -73.989],
 [40.703, -73.988],
 [40.703, -73.987],
 [40.704, -73.987],
 [40.705, -73.988],
 [40.704, -73.989],
 [40.704, -73.991],
 [40.703, -73.995],
 [40.702, -73.992],
 [40.7, -73.988],
 [40.759, -73.963],
 [40.78, -73.951],
 [40.778, -73.952],
 [40.763, -73.949],
 [40.761, -73.963],
 [40.766, -73.964],
 [40.753, -73.987],
 [40.755, -73.994],
 [40.754, -74.0],
 [40.747, -73.971],
 [40.768, -73.964],
 [40.771, -73.969],
 [40.774, -73.969],
 [40.777, -73.967],
 [40.781, -73.964],
 [40.77, -73.964],
 [40.778, -73.909],
 [40.778, -73.913],
 [40.776, -73.915],
 [40.753, -73.97],
 [40.752, -73.97],
 [40.759, -73.969],
 [40.774, -73.963],
 [40.773, -73.962],
 [40.774, -73.955],
 [40.775, -73.954],
 [40.783, -73.948],
 [40.77, -73.984],
 [40.776, -73.987],
 [40.746, -73.953],
 [40.743, -73.958],
 [40.743, -73.96],
 [40.728, -73.985],
 [40.725, -73.987]];


export { mask_gps, maskhole_gps, nomask_gps };