---
title: "New Repo: XScope"
categories: new-repo
---

[XScope](https://github.com/LLNL/Xscope) finds inputs that trigger floating-point exceptions, such as NaN (not a number) and infinity, in CUDA functions using Bayesian optimization (BO). XScope assumes that the CUDA functions are a black box, i.e., the source code is not available. It searches the input space using several methods to guide BO into extreme cases. When an input is found to trigger an exception in the target CUDA function, the input is shown to the user. A forthcoming paper related to this repo has been accepted to SC22.
