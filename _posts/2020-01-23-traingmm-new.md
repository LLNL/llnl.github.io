---
title: "New Repo: trainGMM"
categories: new-repo
---

[trainGMM](https://github.com/LLNL/trainGMM) performs Gaussian mixture model (GMM) analysis over a user-provided data set of sampled waveforms to compute vectors suitable for discriminating between kinds of pulse shapes, produces graphics illustrating the results, and writes output data to a file. The output data can be uploaded to special FPGA (field programmable gate array) firmware that runs on the Struck SIS3316 digitizer. The parameters of the GMM and the data it operates on are restricted to match several hard-coded parameters expected by the Struck FPGA code. trainGMM was developed in python and is run using python.
