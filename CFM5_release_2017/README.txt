Version 5 of the Community Fault Model (CFM) for Southern California as described in Plesch et al. (2007). 

The SCEC Community Fault Model (CFM) is an object-oriented, three-dimensional representation of more than 150 active faults 
in southern California (Plesch et al., 2007).  The model is organized into more than 350 fault objects which include triangulated 
surface representations (t-surfs) of these faults and associated meta data. The t-surfs are defined from surfaces traces, seismicity, 
seismic reflection profiles, wells, geologic cross-sections and models. The model includes alternative representations of many faults, 
with preferred versions established by a CFM working group in SCEC. A subset of the model is provided in a number of mesh resolutions.

The model serves the Southern California Earthquake Center (SCEC) as a unified resource for physics-based fault systems modeling, 
strong ground-motion prediction, and probabilistic seismic hazards assessment (e.g., UCERF3). Together with the Community Velocity Model (CVM-H 15.1.0), 
the CFM comprised SCEC's Unified Structural Representation of the Southern California crust and upper mantle (Shaw et al., 2015).

The latest release of the CFM is version 5.2, which includes many new and revised fault representations (Nicholson et al., 2017). 
In addition, the new model expands and improves the database component of CFM to help ensure the internal consistency and maintainability
of the model. This hierarchical name and numbering system enables model users to access and assess the full richness of the various fault systems,
3D fault models, and 3D fault components in CFM. In addition to fault area, fault system, fault section and fault name, the expanded CFM database 
now includes fields for alternate and CFM version number, source, descriptor, references, USGS Quaternary fault (Qfault) ID, and fault attributes 
of average strike, dip, area, and faulting style. Care was taken to insure that the database is synchronized with the latest catalog of individual, 
t-surf CFM fault representations.

-------------------------------------------------------------------------------------------------------------
The directory structure is as follows:

doc/
   Documentation, which includes an MS Excel spreadsheet with detailed metadata about each fault surface, an
   image showing a perspective view of the CFM5 model. Strike-slip faults are green, reverse faults are red, 
   and normal faults are blue. 
   
obj/CFM5_all/
   All CFM5 surfaces in gocad tsurf format.
   
obj/CFM5_preferred/
   The preferred CFM5 fault surface representations, which are provided in the several mesh versions.
   All data is provided in UTM zone 11 NAD27 coordinates.
   
obj/CFM5_preferred/500m/
   A semi-regularized mesh provided at ~500m resolution in gocad tsurf format.

obj/CFM5_preferred/1000m/
   A semi-regularized mesh provided at ~1000m resolution in gocad tsurf format.

obj/CFM5_preferred/native/
   This contains the CFM5 preferred fault surfaces in gocad tsurf format using the native mesh.
   The native mesh uses a variable mesh resolution. Smaller triangles indicate where a fault is well constrained.

obj/CFM5_preferred/mve/
   This directory contains the CFM5 preferred surfaces in Midland Valley Move format (.mve) using the native mesh. 
   .mve files can be loaded with the Midland Valley Move software suite (requires a license), or the 
   free Move Viewer software. See www.mve.com for details.
 
-------------------------------------------------------------------------------------------------------------
Citations

Hauksson E., W-C. Chi, P. Shearer, and A. Michael, Comprehensive  waveform cross-correlation of southern California seismograms: Part
1. Refined hypocenters obtained using the double-difference method and tectonic implications (abstract), Fall. Ann. Meeting,  American Geophys. Un., Dec. 8-12, 2003, San Francisco CA.

Plesch, A., Shaw, J. H., Bryant, W. A., Carena, S., Cooke, M. L., Dolan, J. F., Fuis, G. S., Gath, E. M., Grant Ludwig, L. B., Hauksson, E., Jordan, T. H., Kamerling, M. J., Legg, M. R., Lindvall, S. C., Magistrale, H., Nicholson, C., Niemi, N. A., Oskin, M. E., Perry, S. C., Planansky, G., Rockwell, T. K., Shearer, P. M., Sorlien, C. C., Suess, M., Suppe, J., Treiman, J. A., & Yeats, R. S. (2007). Community Fault Model (CFM) for Southern California. Bulletin of the Seismological Society of America, 97(6), 1793-1802. doi: 10.1785/0120050211.

Nicholson, C., Plesch, A., & Shaw, J. H. (2017, 08). Community Fault Model Version 5.2: Updating & expanding the CFM 3D fault set and its associated fault database. Poster Presentation at 2017 SCEC Annual Meeting.
Shaw, J. H., A. Plesch, C. Tape, M. P. Suess, T. H. Jordan, G. Ely, E. Hauksson, J. Tromp, T. Tanimoto, R. Graves, K. Olsen, C. Nicholson, P. J. Maechling, C. Rivero, P. Lovely, C. M. Brankman, J. Munster, Unified Structural Representation of the southern California crust and upper mantle, Earth and Planetary Science Letters, 415, 1?15.


Figure Caption
Perspective view of CFM 5.2 showing strike-slip (green), thrust/reverse (red), and normal (blue) faults that comprise the preferred model. Earthquake locations (Hauksson, 2003, updated 2016) are shown by year. Scale is in meters.

Projection
Fault representations are provided in Universal Transverse Mercator projection (UTM zone 11 N, North American datum 1927).

