export const blogPosts = [
    {
        id: 1,
        title: "Understanding Unity's Object Pooling Pattern",
        slug: "unity-object-pooling-pattern",
        excerpt: "Learn how to implement efficient object pooling in Unity to optimize performance and reduce garbage collection overhead in your games.",
        content: `# Understanding Unity's Object Pooling Pattern

Object pooling is one of the most important optimization techniques in game development. In this comprehensive guide, we'll explore how to implement and use object pooling effectively in Unity.

## What is Object Pooling?

Object pooling is a design pattern that involves reusing objects instead of creating and destroying them repeatedly. This technique is particularly useful in games where you frequently spawn and despawn objects like bullets, enemies, or particle effects.

### Why Use Object Pooling?

1. **Reduced Garbage Collection**: Less frequent allocation and deallocation of objects
2. **Better Performance**: Avoids the overhead of instantiating and destroying GameObjects
3. **Smoother Gameplay**: Prevents frame rate drops caused by garbage collection
4. **Memory Efficiency**: Better memory usage patterns

## Basic Implementation

Here's a simple object pooling implementation in Unity:

\`\`\`csharp
public class ObjectPool : MonoBehaviour
{
    [SerializeField] private GameObject prefab;
    [SerializeField] private int poolSize = 10;
    
    private Queue<GameObject> pool = new Queue<GameObject>();
    
    void Start()
    {
        // Pre-populate the pool
        for (int i = 0; i < poolSize; i++)
        {
            GameObject obj = Instantiate(prefab);
            obj.SetActive(false);
            pool.Enqueue(obj);
        }
    }
    
    public GameObject GetPooledObject()
    {
        if (pool.Count > 0)
        {
            GameObject obj = pool.Dequeue();
            obj.SetActive(true);
            return obj;
        }
        
        // Expand pool if needed
        return Instantiate(prefab);
    }
    
    public void ReturnToPool(GameObject obj)
    {
        obj.SetActive(false);
        pool.Enqueue(obj);
    }
}
\`\`\`

## Advanced Techniques

### Generic Pool Manager

For more flexibility, you can create a generic pool manager that handles multiple object types:

\`\`\`csharp
public class PoolManager : MonoBehaviour
{
    [System.Serializable]
    public class Pool
    {
        public string tag;
        public GameObject prefab;
        public int size;
    }
    
    public List<Pool> pools;
    public Dictionary<string, Queue<GameObject>> poolDictionary;
    
    void Start()
    {
        poolDictionary = new Dictionary<string, Queue<GameObject>>();
        
        foreach (Pool pool in pools)
        {
            Queue<GameObject> objectPool = new Queue<GameObject>();
            
            for (int i = 0; i < pool.size; i++)
            {
                GameObject obj = Instantiate(pool.prefab);
                obj.SetActive(false);
                objectPool.Enqueue(obj);
            }
            
            poolDictionary.Add(pool.tag, objectPool);
        }
    }
}
\`\`\`

## Best Practices

1. **Pre-populate pools** during loading screens
2. **Reset object state** when returning to pool
3. **Use appropriate pool sizes** based on your game's needs
4. **Consider using Unity's built-in ObjectPool** (Unity 2021.1+)

## Real-World Example: Bullet System

In my Connect Animal project, I used object pooling for particle effects and UI elements, which significantly improved performance on mobile devices.

## Conclusion

Object pooling is essential for any Unity developer serious about performance optimization. Start with simple implementations and gradually move to more sophisticated systems as your projects grow in complexity.

Remember: premature optimization is the root of all evil, but object pooling for frequently spawned objects is almost always worth implementing from the start.`,
        author: "Doan Viet",
        publishedAt: "2024-01-15",
        readTime: "8 min read",
        tags: ["Unity", "Performance", "Design Patterns", "Optimization"],
        views: 1250
    },
    {
        id: 2,
        title: "Building Multiplayer Games with Photon",
        slug: "multiplayer-games-photon-unity",
        excerpt: "A complete guide to implementing real-time multiplayer functionality in Unity using Photon PUN2. From setup to advanced features.",
        content: `# Building Multiplayer Games with Photon

Creating multiplayer games can be challenging, but Photon makes it significantly easier. In this guide, we'll walk through building a complete multiplayer game using Photon PUN2.

## Why Photon?

Photon is one of the most popular networking solutions for Unity because:

- **Easy to use**: Simple API and great documentation
- **Cross-platform**: Works on all Unity supported platforms
- **Reliable**: Battle-tested infrastructure
- **Free tier**: Great for indie developers and prototyping

## Setting Up Photon PUN2

First, let's set up Photon in your Unity project:

1. Download PUN2 from the Unity Asset Store
2. Import the package into your project
3. Create a Photon account and get your App ID
4. Configure the PUN2 settings

\`\`\`csharp
using Photon.Pun;
using Photon.Realtime;

public class NetworkManager : MonoBehaviourPunPV, IConnectionCallbacks
{
    void Start()
    {
        PhotonNetwork.ConnectUsingSettings();
    }
    
    public void OnConnectedToMaster()
    {
        Debug.Log("Connected to Master");
        PhotonNetwork.JoinLobby();
    }
}
\`\`\`

## Creating and Joining Rooms

Room management is crucial for multiplayer games:

\`\`\`csharp
public void CreateRoom()
{
    RoomOptions roomOptions = new RoomOptions()
    {
        MaxPlayers = 4,
        IsVisible = true,
        IsOpen = true
    };
    
    PhotonNetwork.CreateRoom("MyRoom", roomOptions);
}

public void JoinRandomRoom()
{
    PhotonNetwork.JoinRandomRoom();
}
\`\`\`

## Synchronizing Player Movement

One of the most common requirements is synchronizing player positions:

\`\`\`csharp
public class PlayerController : MonoBehaviourPunPV, IPunObservable
{
    private Vector3 networkPosition;
    private Quaternion networkRotation;
    
    void Update()
    {
        if (photonView.IsMine)
        {
            // Handle input
            HandleMovement();
        }
        else
        {
            // Interpolate to network position
            transform.position = Vector3.Lerp(transform.position, networkPosition, Time.deltaTime * 10f);
            transform.rotation = Quaternion.Lerp(transform.rotation, networkRotation, Time.deltaTime * 10f);
        }
    }
    
    public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
    {
        if (stream.IsWriting)
        {
            stream.SendNext(transform.position);
            stream.SendNext(transform.rotation);
        }
        else
        {
            networkPosition = (Vector3)stream.ReceiveNext();
            networkRotation = (Quaternion)stream.ReceiveNext();
        }
    }
}
\`\`\`

## RPCs for Game Events

Remote Procedure Calls (RPCs) are perfect for one-time events:

\`\`\`csharp
[PunRPC]
void FireBullet(Vector3 position, Vector3 direction)
{
    // Spawn bullet on all clients
    GameObject bullet = Instantiate(bulletPrefab, position, Quaternion.LookRotation(direction));
}

// Call the RPC
photonView.RPC("FireBullet", RpcTarget.All, firePoint.position, firePoint.forward);
\`\`\`

## Advanced Features

### Custom Properties

Store game-specific data:

\`\`\`csharp
ExitGames.Client.Photon.Hashtable props = new ExitGames.Client.Photon.Hashtable();
props["score"] = playerScore;
PhotonNetwork.LocalPlayer.SetCustomProperties(props);
\`\`\`

### Master Client Authority

Handle game logic on the master client:

\`\`\`csharp
if (PhotonNetwork.IsMasterClient)
{
    // Handle game state, spawn enemies, etc.
    SpawnEnemies();
}
\`\`\`

## Best Practices

1. **Minimize network traffic**: Only sync what's necessary
2. **Use RPCs for events**: Don't continuously sync one-time actions
3. **Handle disconnections**: Always plan for players leaving
4. **Validate on master client**: Prevent cheating
5. **Test with high latency**: Simulate real network conditions

## Common Pitfalls

- Over-synchronizing data
- Not handling master client switching
- Forgetting to clean up networked objects
- Not testing with multiple builds

## Conclusion

Photon PUN2 makes multiplayer development accessible to indie developers. Start with simple synchronization and gradually add more complex features as you become comfortable with the networking concepts.

In my Multiplayer Battle Wizards project, I used these exact techniques to create a smooth 4-player combat experience that works seamlessly across different platforms.`,
        author: "Doan Viet",
        publishedAt: "2024-02-20",
        readTime: "12 min read",
        tags: ["Unity", "Multiplayer", "Photon", "Networking"],
        views: 892
    },
    {
        id: 3,
        title: "Mobile Game Optimization in Unity",
        slug: "mobile-game-optimization-unity",
        excerpt: "Essential techniques for optimizing Unity games for mobile devices. Learn about performance profiling, texture compression, and battery life optimization.",
        content: `# Mobile Game Optimization in Unity

Mobile game development comes with unique challenges. Limited processing power, battery life, and memory constraints require careful optimization. Here's everything you need to know.

## Performance Profiling

Before optimizing, you need to identify bottlenecks:

### Unity Profiler

The Unity Profiler is your best friend for mobile optimization:

- **CPU Usage**: Identify expensive scripts and functions
- **Memory Usage**: Track memory allocations and leaks  
- **Rendering**: Analyze draw calls and overdraw
- **Audio**: Monitor audio memory usage

### Device Testing

Always test on actual devices:

\`\`\`csharp
void Update()
{
    // Monitor performance in real-time
    if (Time.unscaledTime - lastFPSUpdate > 1.0f)
    {
        currentFPS = (int)(1.0f / Time.unscaledDeltaTime);
        lastFPSUpdate = Time.unscaledTime;
    }
}
\`\`\`

## Texture Optimization

Textures often consume the most memory on mobile devices:

### Compression Settings

- **Android**: Use ETC2 for RGB, ETC2+A8 for RGBA
- **iOS**: Use ASTC 4x4 to 8x8 based on quality needs
- **Universal**: Consider ASTC for both platforms

### Resolution Guidelines

- **UI Elements**: 512x512 or smaller
- **Characters**: 1024x1024 maximum
- **Environments**: Use texture atlasing

\`\`\`csharp
// Runtime texture compression check
if (SystemInfo.SupportsTextureFormat(TextureFormat.ASTC_4x4))
{
    // Use ASTC textures
}
else
{
    // Fallback to platform-specific format
}
\`\`\`

## Rendering Optimization

### Reduce Draw Calls

Batching is crucial for mobile performance:

- **Static Batching**: For non-moving objects
- **Dynamic Batching**: For small moving objects  
- **GPU Instancing**: For identical objects

\`\`\`csharp
// Enable GPU Instancing in your shaders
Shader "Custom/InstancedShader"
{
    Properties { ... }
    
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            
            // ... shader code
            ENDCG
        }
    }
}
\`\`\`

### LOD (Level of Detail)

Implement LOD for complex models:

\`\`\`csharp
public class LODController : MonoBehaviour
{
    public GameObject[] lodModels;
    public float[] distances;
    
    void Update()
    {
        float distance = Vector3.Distance(transform.position, Camera.main.transform.position);
        
        for (int i = 0; i < distances.Length; i++)
        {
            if (distance < distances[i])
            {
                ShowLOD(i);
                break;
            }
        }
    }
}
\`\`\`

## Memory Management

### Object Pooling

Reuse objects instead of creating/destroying:

\`\`\`csharp
public class MobileObjectPool : MonoBehaviour
{
    private Queue<GameObject> pool = new Queue<GameObject>();
    
    public GameObject GetPooledObject()
    {
        if (pool.Count > 0)
        {
            return pool.Dequeue();
        }
        
        return CreateNewObject();
    }
    
    public void ReturnToPool(GameObject obj)
    {
        obj.SetActive(false);
        pool.Enqueue(obj);
    }
}
\`\`\`

### Garbage Collection

Minimize allocations in Update loops:

\`\`\`csharp
// Bad - creates garbage
void Update()
{
    string debugText = "Health: " + health.ToString();
}

// Good - cache and reuse
private StringBuilder sb = new StringBuilder();

void Update()
{
    sb.Clear();
    sb.Append("Health: ");
    sb.Append(health);
    debugText = sb.ToString();
}
\`\`\`

## Audio Optimization

### Compression Settings

- **Music**: Use Vorbis compression
- **Sound Effects**: Use ADPCM for short clips
- **Voice**: Use Vorbis with lower quality

### Dynamic Loading

Load audio assets when needed:

\`\`\`csharp
public class AudioManager : MonoBehaviour
{
    private Dictionary<string, AudioClip> loadedClips = new Dictionary<string, AudioClip>();
    
    public void LoadAudioClip(string clipName)
    {
        if (!loadedClips.ContainsKey(clipName))
        {
            AudioClip clip = Resources.Load<AudioClip>(clipName);
            loadedClips[clipName] = clip;
        }
    }
    
    public void UnloadAudioClip(string clipName)
    {
        if (loadedClips.ContainsKey(clipName))
        {
            Resources.UnloadAsset(loadedClips[clipName]);
            loadedClips.Remove(clipName);
        }
    }
}
\`\`\`

## Battery Life Optimization

### Target Frame Rate

Don't run faster than necessary:

\`\`\`csharp
void Start()
{
    // Limit to 30 FPS for better battery life
    Application.targetFrameRate = 30;
    
    // Or match device refresh rate
    Application.targetFrameRate = Screen.currentResolution.refreshRate;
}
\`\`\`

### Reduce Background Processing

\`\`\`csharp
void OnApplicationPause(bool pauseStatus)
{
    if (pauseStatus)
    {
        // Reduce update frequency
        InvokeRepeating("SlowUpdate", 0f, 1f);
    }
    else
    {
        // Resume normal updates
        CancelInvoke("SlowUpdate");
    }
}
\`\`\`

## Platform-Specific Optimizations

### Android

- Use IL2CPP for better performance
- Consider Android App Bundle
- Optimize for different screen densities

### iOS

- Use Metal rendering API
- Optimize for different device generations
- Consider iOS-specific features like background app refresh

## Testing and Validation

### Performance Metrics

Track key metrics:

\`\`\`csharp
public class PerformanceMonitor : MonoBehaviour
{
    public float targetFPS = 30f;
    public float memoryWarningThreshold = 100f; // MB
    
    void Update()
    {
        // Monitor FPS
        float currentFPS = 1.0f / Time.unscaledDeltaTime;
        if (currentFPS < targetFPS * 0.8f)
        {
            Debug.LogWarning("FPS drop detected!");
        }
        
        // Monitor memory
        long memoryUsage = System.GC.GetTotalMemory(false) / 1024 / 1024;
        if (memoryUsage > memoryWarningThreshold)
        {
            Debug.LogWarning("High memory usage: " + memoryUsage + "MB");
        }
    }
}
\`\`\`

## Conclusion

Mobile optimization is an iterative process. Start with the biggest bottlenecks and gradually refine your optimizations. Always test on real devices and prioritize the user experience.

In my Connect Animal project, these optimization techniques helped achieve smooth 60fps gameplay even on older Android devices, significantly improving the user experience and app store ratings.`,
        author: "Doan Viet",
        publishedAt: "2024-03-10",
        readTime: "15 min read",
        tags: ["Unity", "Mobile", "Performance", "Optimization"],
        views: 1456
    }
];