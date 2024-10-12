const modules = Process.enumerateModules();
console.log("[+]Number of modules: " + modules.length);
//const main_module = Process.mainModule;
//console.log(JSON.stringify(main_module));
var M = [];
for(var id = 0; id<modules.length; id++){
    var module = modules[id];
    var newModule = {
        name: module.name,
        path: module.path,
        size: module.size
    };
    M.push(newModule)
}
send(M);