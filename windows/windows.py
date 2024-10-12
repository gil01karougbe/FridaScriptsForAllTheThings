import argparse, frida
from prettytable import PrettyTable

def argments_parser():
    parser = argparse.ArgumentParser(description="Tool that help inject js in a process!!!")
    parser.add_argument("-p", "--process-id", type=int, help="Process ID (integer)")
    parser.add_argument("--load", type=str, help="File to load")
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

def main(pid, jsfile):
    device = frida.get_local_device()
    info = device.query_system_parameters()
    system = [ {
        "arch": info['arch'],
        "os_name": info['os']['name'],
        "os_version": info['os']['version'],
        "platform": info['platform'],
        "localname": info['name'],
        "access_level": info['access']
    } ]
    display(system)
    with open(jsfile, 'r') as file:
        jscode = file.read().strip()
    process = device.attach(pid)
    script = process.create_script(jscode)
    script.on("message", on_message)
    script.load()

if __name__ == "__main__":
    args = argments_parser()
    if args.process_id is not None or args.load:
        print("[+]Process ID: ", args.process_id)
        print("[+]File to load: ", args.load)
        main(args.process_id, args.load)
    else:
        print("[-]Usage: python windows.py -p <PID> --load <JS FILE PATH>")