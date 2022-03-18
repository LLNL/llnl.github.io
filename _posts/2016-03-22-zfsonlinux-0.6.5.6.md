---
title: "OpenZFS on Linux 0.6.5.6"
categories: release
---

Version 0.6.5.6 of OpenZFS on Linux, the native Linux kernel port of the ZFS filesystem, is now available at: [https://zfsonlinux.org](https://zfsonlinux.org)

Some notable improvements in version 0.6.5.6 are:

- Bugs fixes for case-insensitive filesystem support. Users running Samba servers that export ZFS filesystems will benefit from this update.
- Bug fixes and improved scalability for zvols. Support for asynchronous creation of device nodes. This fixes several hangs and allows pools with many zvols to be imported quickly.
- Add `-gLP` to zpool subcommands to print vdev names as a GUID, a real path resolving all symbolic links, and as a full path. This change enables better ZFS integration in Ubuntu’s GRUB utilities.
- Fix a corruption bug where, in certain circumstances, `zfs send -i` (incremental send) can produce a stream which will result in incorrect sparse file contents on the target.

For more details, check out the [full changelog](https://github.com/zfsonlinux/zfs/releases/tag/zfs-0.6.5.6).
