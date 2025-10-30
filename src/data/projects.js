export const projects = [
    {
        id: 1,
        title: "Connect Animal",
        year: "2023",
        description: "A relaxing puzzle game where you match pairs of cute animals to clear the board within a time limit. Features engaging gameplay mechanics, daily rewards, and multi-language support for global accessibility.",

        // New project overview fields
        mainTasks: [
            "Implemented core gameplay mechanics and level progression system",
            "Integrated Unity In-app Purchase and monetization features",
            "Developed multi-language localization system",
            "Optimized performance using Object Pooling patterns",
            "Implemented PlayFab data storage and show leaderboard"
        ],
        teamSize: "1",
        duration: "2 months (November 2023 - December 2023)",
        platform: "Android, iOS",

        features: [
            "Level gameplay",
            "Play time",
            "Daily reward",
            "Multi languages",
            "Shop",
            "Playfab Data Storage"
        ],
        technologies: [
            "Unity In-app Purchase",
            "Lean Localization",
            "Unity Ads",
            "Playfab SDK"
        ],
        designPatterns: [
            "Object Pooling",
            "Singleton",
            "Observer"
        ],

        // Video support
        videoUrl: "https://youtu.be/3mFkaV6rwME",
        // videoUrl: "https://drive.google.com/file/d/1FzRtwqXFJCYZJuGOHFrBuWEnrWKf_8Xh/view?usp=share_link",
        // or Google Drive: "https://drive.google.com/file/d/your_file_id/view"

        // Screenshot configuration
        screenshotColumns: 2,
        screenshots: [
            "/images/connect-animal/ima4.png",
            "/images/connect-animal/ima2.png",
            "/images/connect-animal/ima3.png",
            "/images/connect-animal/ima1.png",
            "/images/connect-animal/ima5.png",
            "/images/connect-animal/ima6.png",
            "/images/connect-animal/ima7.png",
            "/images/connect-animal/ima8.png"
        ]
    },
    {
        id: 2,
        title: "Metarush",
        year: "2024",
        description: "Metarush is a free PC multiplayer platform battle royale. Challenge and compete in the metaverse obstacle courses, survival and final showdown with friends. Use power ups and special items in the game to make your way to the top to earn special rewards and unlock the full potential of your Metarushers!",

        mainTasks: [
            "Implemented game UI, include: Main screen, Setting screen, Game screen, Inventory screen.",
            "Implemented camera effect, Camera sticks near walls to avoid clipping and enhance view.",
            "Storage game settings: Display, Audio, Bind button on keyboard and controller.",
            "Implemented audio manager.",
            "Implemented see-through (X-ray) feature using Render Feature in Universal Render Pipeline (URP).",
            "Implemented wireless controller support (Xbox Controller, PS4, PS5)"
        ],
        teamSize: "20+ (programmers, designers, 2D artist, 3D artist, Tester)",
        duration: "12 months (February 2024 - February 2025)",
        platform: "PC (Windows)",

        features: [
            "Multiplayer",
            "Battle gameplay",
            "Shop, NFT",
            "Wireless Controller"
        ],
        technologies: [
            "Photon Quantum",
            "Unity Engine",
            "Blockchain Integration"
        ],
        designPatterns: [
            "Object Pooling",
            "Singleton",
            "Observer",
            "Factory"
        ],

        // videoUrl: "https://drive.google.com/file/d/11hdMA07hGL6Q3LfC_Zj2BDvuqlRNpJZu/view?usp=share_link",
        screenshotColumns: 1,
        screenshots: [
            "/images/metarush/metarush1.png",
            "/images/metarush/metarush2.png",
            "/images/metarush/metarush3.png",
            "/images/metarush/metarush4.png",
            "/images/metarush/metarush5.png",
            "/images/metarush/metarush6.png",
        ]
    },
    {
        id: 3,
        title: "Multiplayer Battle Wizards",
        year: "2025",
        description: "An intense multiplayer battle game supporting up to 4 players per room. Players control powerful wizards with unique abilities in fast-paced magical combat.",

        mainTasks: [
            "Designed and implemented spell casting system",
            "Developed room-based multiplayer architecture",
            "Created wizard character abilities and balancing",
            "Implemented real-time combat synchronization"
        ],
        teamSize: "1 developers",
        duration: "2.5 months",
        platform: "PC, Mobile, WebGL",

        features: [
            "Multiplayer",
            "Battle gameplay"
        ],
        technologies: [
            "Photon PUN"
        ],
        designPatterns: [
            "Object Pooling",
            "Singleton",
            "Observer"
        ],

        videoUrl: "https://drive.google.com/file/d/11hdMA07hGL6Q3LfC_Zj2BDvuqlRNpJZu/view?usp=share_link",
        screenshotColumns: 1,
        screenshots: [
            "/images/battle-wizard/battle-wizard5.png",
            "/images/battle-wizard/battle-wizard1.png",
            "/images/battle-wizard/battle-wizard2.png",
            "/images/battle-wizard/battle-wizard3.png",
            "/images/battle-wizard/battle-wizard4.png",
            "/images/battle-wizard/battle-wizard6.png",
            "/images/battle-wizard/battle-wizard7.png",
            "/images/battle-wizard/battle-wizard8.png",
        ]
    },
    {
        id: 4,
        title: "Multiplayer Chess",
        year: "2025",
        description: "A full-stack multiplayer chess game with comprehensive user management, matchmaking, and game history tracking. Built with modern web technologies and real-time communication.",

        mainTasks: [
            "Developed full-stack architecture with .NET 8 backend",
            "Implemented real-time multiplayer using WebSocket",
            "Created user authentication and authorization system",
            "Built matchmaking and room management features",
            "Designed and implemented MongoDB data layer",
            "Containerized application using Docker"
        ],
        teamSize: "1 developers",
        duration: "2 months (June 2025 - July 2025)",
        platform: "Web Browser, Cross-platform",

        features: [
            "Login/Register",
            "Room, match making",
            "Match History",
            "Multiplayer",
            "Turn base gameplay"
        ],
        technologies: [
            "Unity Engine",
            "C# Programming languages",
            ".NET 8",
            ".NET Websocket",
            ".NET Restfull API",
            "Mongo Database",
            "Docker",
            "Newtonsoft.Json"
        ],
        designPatterns: [
            "Repository Pattern",
            "Object Pooling",
            "Singleton",
            "Observer"
        ],

        videoUrl: "https://drive.google.com/file/d/1iQP_6LwJKu1L-UbNqMJdzVT_ofaW7R2d/view?usp=share_link",
        screenshotColumns: 1,
        screenshots: [
            "/images/chess-server/chess1.png",
            "/images/chess-server/chess2.png",
            "/images/chess-server/chess3.png",
            "/images/chess-server/chess4.png",
            "/images/chess-server/chess5.png",
            "/images/chess-server/chess6.png",
            "/images/chess-server/chess7.png"
        ]
    }
];