---
title: Rubik
author: Todd Gamblin
description: >
    Rubik generates mapping files for torus and mesh networks according to
    structured transformations of blocks within the ranks.

license: BSD
release_number: LLNL-CODE-599252
source_code_url: https://github.com/llnl/rubik
project_url: https://computation.llnl.gov/project/performance-analysis-through-visualization/software.php
---

Rubik simplifies the process of creating task mappings for structured
applications. Rubik allows an application developer to specify communicating
groups of processes in a virtual application topology succinctly and map them
onto groups of processors in a physical network topology. Both the application
topology and the network topology must be Cartesian, but the dimensionality of
either is arbitrary. This allows users to easily map low-dimensional structures
such as planes to higher-dimensional structures like cubes to increase the
number of links used for routing. Rubik supports a number of elementary
operations such as splits, tilts, or shifts, that can be combined into a large
number of unique patterns. Rubik also provides embedding operations that adjust
the way tasks are laid out within groups. In conjunction with Rubik's mapping
semantics, these operations allow users to create a wide variety of task
layouts for structured codes by composing a few fundamental operations.
