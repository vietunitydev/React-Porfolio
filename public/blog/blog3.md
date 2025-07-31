# Mobile Game Optimization in Unity

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

```csharp
void Update()
{
    // Monitor performance in real-time
    if (Time.unscaledTime - lastFPSUpdate > 1.0f)
    {
        currentFPS = (int)(1.0f / Time.unscaledDeltaTime);
        lastFPSUpdate = Time.unscaledTime;
    }
}
```

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

```csharp
// Runtime texture compression check
if (SystemInfo.SupportsTextureFormat(TextureFormat.ASTC_4x4))
{
    // Use ASTC textures
}
else
{
    // Fallback to platform-specific format
}
```

## Rendering Optimization

### Reduce Draw Calls

Batching is crucial for mobile performance:

- **Static Batching**: For non-moving objects
- **Dynamic Batching**: For small moving objects
- **GPU Instancing**: For identical objects

```csharp
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
```

### LOD (Level of Detail)

Implement LOD for complex models:

```csharp
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
```

## Memory Management

### Object Pooling

Reuse objects instead of creating/destroying:

```csharp
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
```

### Garbage Collection

Minimize allocations in Update loops:

```csharp
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
```

## Audio Optimization

### Compression Settings

- **Music**: Use Vorbis compression
- **Sound Effects**: Use ADPCM for short clips
- **Voice**: Use Vorbis with lower quality

### Dynamic Loading

Load audio assets when needed:

```csharp
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
```

## Battery Life Optimization

### Target Frame Rate

Don't run faster than necessary:

```csharp
void Start()
{
    // Limit to 30 FPS for better battery life
    Application.targetFrameRate = 30;
    
    // Or match device refresh rate
    Application.targetFrameRate = Screen.currentResolution.refreshRate;
}
```

### Reduce Background Processing

```csharp
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
```

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

```csharp
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
```

## Conclusion

Mobile optimization is an iterative process. Start with the biggest bottlenecks and gradually refine your optimizations. Always test on real devices and prioritize the user experience.

In my Connect Animal project, these optimization techniques helped achieve smooth 60fps gameplay even on older Android devices, significantly improving the user experience and app store ratings.