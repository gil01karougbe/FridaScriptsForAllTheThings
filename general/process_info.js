console.log("[+]Process ID: " + Process.id);
console.log("[+]Plateform: " + Process.platform);
console.log("[+]Architecture: " + Process.arch);
console.log("[+]Process Page Size: " + Process.pageSize);

const working_dir = Process.getCurrentDir();
console.log("[+]Working Directory: " + working_dir);
const user_home_dir = Process.getHomeDir()
console.log("[+]Current User Home Directory: " + user_home_dir);
const tmp_dir = Process.getTmpDir();
console.log("[+]Temp Directory: " + tmp_dir);

const debug = Process.isDebuggerAttached();
if(debug == true){
    console.log("[+]Debugger Is Present: " + "YES");
}
else{
    console.log("[+]Debugger Is Present: " + "NO");
}
const threads = Process.enumerateThreads();
console.log("[+]Number of threads: " + threads.length);
const current_thread = Process.getCurrentThreadId();
console.log("[+]Current Thread ID: " + current_thread);
var T = [];
for(var id = 0; id<threads.length; id++){
    var thread = threads[id];
    var newThread = {
        id: thread.id,
        state: thread.state
    }; 
    T.push(newThread)
}
send(T);