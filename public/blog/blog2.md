# Building Multiplayer Games with Photon

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

```csharp
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
```

## Creating and Joining Rooms

Room management is crucial for multiplayer games:

```csharp
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
```

## Synchronizing Player Movement

One of the most common requirements is synchronizing player positions:

```csharp
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
```

## RPCs for Game Events

Remote Procedure Calls (RPCs) are perfect for one-time events:

```csharp
[PunRPC]
void FireBullet(Vector3 position, Vector3 direction)
{
    // Spawn bullet on all clients
    GameObject bullet = Instantiate(bulletPrefab, position, Quaternion.LookRotation(direction));
}

// Call the RPC
photonView.RPC("FireBullet", RpcTarget.All, firePoint.position, firePoint.forward);
```

## Advanced Features

### Custom Properties

Store game-specific data:

```csharp
ExitGames.Client.Photon.Hashtable props = new ExitGames.Client.Photon.Hashtable();
props["score"] = playerScore;
PhotonNetwork.LocalPlayer.SetCustomProperties(props);
```

### Master Client Authority

Handle game logic on the master client:

```csharp
if (PhotonNetwork.IsMasterClient)
{
    // Handle game state, spawn enemies, etc.
    SpawnEnemies();
}
```

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

In my Multiplayer Battle Wizards project, I used these exact techniques to create a smooth 4-player combat experience that works seamlessly across different platforms.