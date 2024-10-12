import time, argparse, frida
from prettytable import PrettyTable

def argments_parser():
    parser = argparse.ArgumentParser(description="Tool that helpinject js in an android app!!!")
    parser.add_argument("--package", type=str, help="Application Package")
    parser.add_argument("--load", type=str, help="File to load")
    parser.add_argument("-U", "--usb", action="store_true", help='Use the first usb device available')
    args = parser.parse_args()
    return args

def display(data):
    table = PrettyTable()
    table.field_names = data[0].keys()
    for row in data:
        table.add_row(row.values())
    print(table)

def on_message(message, data):
    if message['type'] == 'send':
        response = message['payload']
        print(response)

def main(package, jsfile):
    device = frida.get_usb_device()
    info = device.query_system_parameters()
    system = [ {
        "arch": info['arch'],
        "os_name": info['os']['name'],
        "version": info['os']['version'],
        "platform": info['platform'],
        "api_level": info['api-level'],
        "access_level": info['access']
    } ]
    display(system)
    with open(jsfile, 'r') as file:
        jscode = file.read().strip()
    pid = device.spawn(package)
    process = device.attach(pid)
    device.resume(pid)
    script = process.create_script(jscode)
    script.on("message", on_message)
    script.load()
    time.sleep(10)

if __name__ == "__main__":
    args = argments_parser()
    if args.package is not None or args.load is not None or args.usb != False:
        print("[+]Package Name: ", args.package)
        print("[+]File to load: ", args.load)
        main(args.package, args.load)
    else:
        print("[-]Usage: python android.py -U --package <PACKAGE> --load <JS FILE PATH>")