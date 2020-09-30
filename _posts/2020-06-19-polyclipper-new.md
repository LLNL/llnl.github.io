---
title: "New Repo: PolyClipper"
categories: new-repo
---

[PolyClipper](https://github.com/LLNL/PolyClipper) is a C++ reimplementation of the geometric clipping operations in the R3D library originally written by Devon Powell, as documented in the paper [Powell & Abell (2015)](https://www.sciencedirect.com/science/article/pii/S0021999115003563). This repo focuses on clipping polygons (in 2D (x,y) coordinates) and polyhedra (in 3D (x,y,z) coordinates) with planes, returning new polygons/polyhedra as the result of this clipping. The input polygons/polyhedra may be non-convex and arbitrarily complex, but the only clipping operation supported is with planes. This is equivalent to intersecting one arbitrary (not necessarily convex) polygon/polyhedron with a convex polygon/polyhedron. [Documentation](https://polyclipper.readthedocs.io/en/latest/) is available.
