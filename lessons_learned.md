# Lessons Learned

Ideas for refining the program next time.

- **Keep demo projects in the main course repo.** Rather than a separate repository for every demo, keep them together in the main repo. It's better organized and saves students from hunting across repositories to find them. This only works for demos students aren't meant to fork; anything they'll fork still needs its own repo.
- **Build directory and structure literacy early.** Students often cloned repos inside other directories (creating needless nesting), or ran `yarn init` somewhere up the directory tree, causing problems. Cover this at the start of the program: navigating the filesystem and knowing where you are before running commands.
- **Provide starter repos for all projects.** Students weren't ready to scaffold their own stack from scratch, especially as loosely-coordinated groups. The **Scattergories** project made this plain: groups spent more time fighting Postgres, Prisma, and Express setup than building the game. A starter repo with baseline dependencies and versions, verified to work together, lets them focus on coding instead of troubleshooting setup.
- **Standardize environments.** Provide everyone with the same OS to streamline environment setup. This could be bootable USB drives, VM installation, or thin-client access. We experienced constant issues throughout the program arising from differences in OS, with poor support for Windows.
