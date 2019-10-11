## 8. [Hadoop](http://aosabook.org/en/hdfs.html)

A distributed file system and framework for splitting up tasks running on massive amounts of data.

The parts:

- Nodes. Essentially a computer - a cheap piece of consumer hardware. There are a few types of these:
- DataNode. Holds a bit of the data split between files and directories, then each file is split up into blocks. Typically each DataNode has 2 other clones.
- NameNode. Manages the DataNodes that make up a cluster
  - Holds a "namespace image" in RAM (on startup, it doesn't edit it), essentially a map of the DataNodes, the data they each contain, and some metadata like disk usage and current jobs.
  - Passes instructions to the DataNodes, eg: "replicate yoself" or "A CRUD job just came in, you handle it"
  - Load balances instructions between DataNodes based on the metadata.
  - Any changed to the namespace are written to a writeahead journal (though this responsibility can be delegated to a BackupNode).
- BackupNode. Takes a journal stream from a NameNode and maintains it's own namespace image, but it updates the image as the stream comes in. It's a live backup for the NameSpace node.
- CheckpointNode. Keeps a copy of a namespace image on a separate server from the related NameNode. Once a day (or so) it gets the NameNode's journal, merges it with the namespace image, and gives the updated image to the relevant NameNode so said NameNode can clear it's local journal. Not sure what happens when there's a BackupNode.
- Cluster. Typically one NameNode and several thousand DataNodes. Each cluster is a namespace, with a namespace ID
- HDFS Client. Creates the interface for external apps to run CRUD / Analysis ops on the data & talks to NameNodes / DataNodes. It also exposes a directory for the data allowing external apps to handle their own cluster/DataNode routing?

On Startup

Brand new NameNodes starting up - some are assigned roles as CheckpointNodes or BackupNodes, most (guessing) are left as NameNodes.
Pre-existing NameNodes retrieve the backup namespace image from the relevant CheckpointNode and use their local journal to bring the image up to date.
Brand new DataNodes, with no existing data, connect to a NameNode (how?) and are assigned a namespace ID and a "unique storage ID".
"experienced" DataNodes, those with data, connect to their NameNode (how?) and verify software versions & namespace ID, if either don't match it's shut down - and probably recycled?. If all is good, they send a "block report" detailing which data blocks are contained.

While running

DataNodes send heartbeats roughly every 3 seconds to their NameNode. If a heartbeat stops, a NameNode will kill (and replace?) the offending DataNode. Heartbeats contain metadata so the NameNode can keep track of each DataNode's state throughout it's lifetime. NameNodes will reply to these heartbeats with operation requests (CRUD / processing / etc). DataNodes will recieve these requests then take on the responsability of fullfilling them - which will save the NameNode from being overwhelmed with intense computation.

Interacting with Hadoop!

Requests from external apps are handled by the "HDFS client". It allows access to directories and files via paths in a namespace. (in a namespace?). DataNode replicas, metadata, loadbalancing operations are hidden from the client, it doesn't need to worry about that stuff.

Writes: The NameNode organises a "pipeline" of DataNodes. Each packet of data to write is sent through each DataNode in the pipeline then an acknowledgment is returned to the client. Checksums are computed for each block of data to later test for corrupiton.

Reads: The NameNode gives the client a list of replica DataNodes. Each is tried until a successfull read is managed.

Only one client can write to a specific file, but multiple clients can read from a file.

The physical placement of Nodes (servers) in racks is also considered. A balance between performance (proximity) and reliability (duplication accross racks) is aimed at, it's a bit dense so read up on those details in the original article if you wish! (8.3.2)