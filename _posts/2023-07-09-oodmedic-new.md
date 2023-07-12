---
title: "New Repo: OODmedic"
categories: multimedia new-repo
---

[OODmedic](https://github.com/LLNL/OODmedic) hosts the PyTorch implementation for the paper "[Know Your Space: Inlier and Outlier Construction for Calibrating Medical OOD Detectors](https://arxiv.org/pdf/2207.05286.pdf)," which was presented at the 2023 Medical Imaging with Deep Learning (MIDL) conference. The research team [launched a website](https://software.llnl.gov/OODmedic/) with additional resources and recorded a [video presentation](https://youtu.be/jpR7ouFTDqA) of their work. The paper's abstract follows:

> We focus on the problem of producing well-calibrated out-of-distribution (OOD) detectors, in order to enable safe deployment of medical image classifiers. Motivated by the difficulty of curating suitable calibration datasets, synthetic augmentations have become highly prevalent for inlier/outlier specification. While there have been rapid advances in data augmentation techniques, this paper makes a striking finding that the space in which the inliers and outliers are synthesized, in addition to the type of augmentation, plays a critical role in calibrating OOD detectors. Using the popular energy-based OOD detection framework, we find that the optimal protocol is to synthesize latent-space inliers along with diverse pixel-space outliers. Based on empirical studies with multiple medical imaging benchmarks, we demonstrate that our approach consistently leads to superior OOD detection (15% − 35% in AUROC) over the state-of-the-art in a variety of open-set recognition settings.
