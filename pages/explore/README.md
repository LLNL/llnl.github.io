# Website Categories

This folder is the home of the JSON file containing the info for the software catalog categories that are displayed on the website's home page. If any edits need to be made to these categories, just edit the data in the JSON and the home page will reflect your changes automatically. (These catalog categories/topics are separate from the category tags on News posts.)

A repository can have up to 20 tags. The list below also contains each category's blurb to ensure consistency in phrasing and length. Note that in some cases the category is plural but the corresponding tag is singular.

For each category, this file contains its title, [icon][icon dir] filepath, and category description. This data is read by the [category info javascript][js dir].

[icon dir]: ../assets/images/
[js dir]: ../js/category-info.js

- **App Infrastructure**: Browse tools for basic functionality common in HPC codes - `app-infrastructure`
- **Applications**: Browse scientific simulation codes and IT management tools - `application`
- **Build Tools**: Automate and simplify complex dependencies and deployments - `build-tools`
- **Data Management & Viz**: Manage visualizations with robust features and configurable analysis - `data-management`, `data-viz`
- **Docs & Tutorials**: Learn more about our software via documentation, examples, and tutorials - `docs`, `documentation`, `tutorial`, `tutorials`
- **File Systems**: Configure data storage and retrieval for more efficient workloads - `file-system`
- **Full Catalog / All Software**: Browse all LLNL open source projects - no tags required
- **Math & Physics Libraries**: Optimize solvers, higher order methods, and AMR frameworks - `math-physics`
- **Performance & Workflow**: Manage and scale complex workflows, tracking, and data collection - `performance`, `workflows`
- **Portable Execution & Memory Mgmt**: Automate data motion and memory allocation on advanced architectures - `memory-management`, `portability`
- **Proxy Applications**: Prepare for testing and porting applications - `proxy-application`
- **System Software**: Manage laptop and desktop computer systems, HPC clusters, and parallel environments - `system-software`

In general, topic tags raise a repo's visibility on GitHub and help users find related projects. The following tags, which are are not associated with the home page categories above, are recommended for LLNL repos: `amr` (adaptive mesh refinement), `arbitrary-lagrangian-eulerian` (ALE), `artificial-intelligence`, `benchmark`, `biology`, `checkpoint`, `chemistry`, `cmake`, `compiler`, `cpp` (C++), `data-analysis`, `deep-learning`, `energy`, `exascale-computing`, `finite-elements`, `fortran`, `gpu`, `graph`, `high-dimensional-data`, `hpc`, `java`, `javascript`, `library`, `machine-learning`, `materials`, `matlab`, `molecular-dynamics`, `monte-carlo`, `mpi`, `natural-language-processing`, `neural-network`, `openmp`, `parallel-computing`, `pde`, `python`, `seismology`, `shell`, `simulation`, `solver`, `templates`, `testing`, `uncertainty-quantification`.

Repos that appear on the [RADIUSS site](https://software.llnl.gov/radiuss/projects/) are listed in that repo's [`contributor-ci.yaml` file](https://github.com/LLNL/radiuss/blob/main/contributor-ci.yaml).

To add a new category to the catalog:

1. Update this README with the category name (in alphabetical order), description, and tag.
2. Add the new icon (.svg) to [Assets > Images](https://github.com/LLNL/llnl.github.io/tree/main/assets/images).
3. Update [`category_info.json`](https://github.com/LLNL/llnl.github.io/blob/main/pages/explore/category_info.json) with category metadata such as image file path, descriptive blurb, and corresponding topic(s).
4. Tag repos with the new topic as appropriate.

To add your repo to the catalog, see instructions in [the site FAQ](https://software.llnl.gov/about/faq/#how-do-i-include-my-repo-in-the-llnl-organization-andor-this-websites-catalog).
