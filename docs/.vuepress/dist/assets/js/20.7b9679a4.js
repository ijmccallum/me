(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{218:function(e,a,t){"use strict";t.r(a);var o=t(0),s=Object(o.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"_8-hadoop"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_8-hadoop","aria-hidden":"true"}},[e._v("#")]),e._v(" 8. "),t("a",{attrs:{href:"http://aosabook.org/en/hdfs.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hadoop"),t("OutboundLink")],1)]),e._v(" "),t("p",[e._v("A distributed file system and framework for splitting up tasks running on massive amounts of data.")]),e._v(" "),t("p",[e._v("The parts:")]),e._v(" "),t("ul",[t("li",[e._v("Nodes. Essentially a computer - a cheap piece of consumer hardware. There are a few types of these:")]),e._v(" "),t("li",[e._v("DataNode. Holds a bit of the data split between files and directories, then each file is split up into blocks. Typically each DataNode has 2 other clones.")]),e._v(" "),t("li",[e._v("NameNode. Manages the DataNodes that make up a cluster\n"),t("ul",[t("li",[e._v('Holds a "namespace image" in RAM (on startup, it doesn\'t edit it), essentially a map of the DataNodes, the data they each contain, and some metadata like disk usage and current jobs.')]),e._v(" "),t("li",[e._v('Passes instructions to the DataNodes, eg: "replicate yoself" or "A CRUD job just came in, you handle it"')]),e._v(" "),t("li",[e._v("Load balances instructions between DataNodes based on the metadata.")]),e._v(" "),t("li",[e._v("Any changed to the namespace are written to a writeahead journal (though this responsibility can be delegated to a BackupNode).")])])]),e._v(" "),t("li",[e._v("BackupNode. Takes a journal stream from a NameNode and maintains it's own namespace image, but it updates the image as the stream comes in. It's a live backup for the NameSpace node.")]),e._v(" "),t("li",[e._v("CheckpointNode. Keeps a copy of a namespace image on a separate server from the related NameNode. Once a day (or so) it gets the NameNode's journal, merges it with the namespace image, and gives the updated image to the relevant NameNode so said NameNode can clear it's local journal. Not sure what happens when there's a BackupNode.")]),e._v(" "),t("li",[e._v("Cluster. Typically one NameNode and several thousand DataNodes. Each cluster is a namespace, with a namespace ID")]),e._v(" "),t("li",[e._v("HDFS Client. Creates the interface for external apps to run CRUD / Analysis ops on the data & talks to NameNodes / DataNodes. It also exposes a directory for the data allowing external apps to handle their own cluster/DataNode routing?")])]),e._v(" "),t("p",[e._v("On Startup")]),e._v(" "),t("p",[e._v('Brand new NameNodes starting up - some are assigned roles as CheckpointNodes or BackupNodes, most (guessing) are left as NameNodes.\nPre-existing NameNodes retrieve the backup namespace image from the relevant CheckpointNode and use their local journal to bring the image up to date.\nBrand new DataNodes, with no existing data, connect to a NameNode (how?) and are assigned a namespace ID and a "unique storage ID".\n"experienced" DataNodes, those with data, connect to their NameNode (how?) and verify software versions & namespace ID, if either don\'t match it\'s shut down - and probably recycled?. If all is good, they send a "block report" detailing which data blocks are contained.')]),e._v(" "),t("p",[e._v("While running")]),e._v(" "),t("p",[e._v("DataNodes send heartbeats roughly every 3 seconds to their NameNode. If a heartbeat stops, a NameNode will kill (and replace?) the offending DataNode. Heartbeats contain metadata so the NameNode can keep track of each DataNode's state throughout it's lifetime. NameNodes will reply to these heartbeats with operation requests (CRUD / processing / etc). DataNodes will recieve these requests then take on the responsability of fullfilling them - which will save the NameNode from being overwhelmed with intense computation.")]),e._v(" "),t("p",[e._v("Interacting with Hadoop!")]),e._v(" "),t("p",[e._v('Requests from external apps are handled by the "HDFS client". It allows access to directories and files via paths in a namespace. (in a namespace?). DataNode replicas, metadata, loadbalancing operations are hidden from the client, it doesn\'t need to worry about that stuff.')]),e._v(" "),t("p",[e._v('Writes: The NameNode organises a "pipeline" of DataNodes. Each packet of data to write is sent through each DataNode in the pipeline then an acknowledgment is returned to the client. Checksums are computed for each block of data to later test for corrupiton.')]),e._v(" "),t("p",[e._v("Reads: The NameNode gives the client a list of replica DataNodes. Each is tried until a successfull read is managed.")]),e._v(" "),t("p",[e._v("Only one client can write to a specific file, but multiple clients can read from a file.")]),e._v(" "),t("p",[e._v("The physical placement of Nodes (servers) in racks is also considered. A balance between performance (proximity) and reliability (duplication accross racks) is aimed at, it's a bit dense so read up on those details in the original article if you wish! (8.3.2)")])])}),[],!1,null,null,null);a.default=s.exports}}]);