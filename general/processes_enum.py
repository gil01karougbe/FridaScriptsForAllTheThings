import frida, argparse
from prettytable import PrettyTable

def argments_parser():
    parser = argparse.ArgumentParser(description="Tool For process enumeration")
    parser.add_argument("-U", "--usb", action="store_true", help='Use the first usb device available')
    args = parser.parse_args()
    return args

def display(data):
    table = PrettyTable()
    table.field_names = data[0].keys()
    for row in data:
        table.add_row(row.values())
    print(table)

def main(device):
    info = device.query_system_parameters()
    print(info)
    all_processes = device.enumerate_processes()
    P = []
    for process in all_processes:
        tmp = {
            "pid": process.pid,
            "name": process.name,
            "parameters": process.parameters
        }
        P.append(tmp)
    display(P)


if __name__ == "__main__":
    args = argments_parser()
    if args.usb == False:
        device = frida.get_local_device()
        main(device)
    else:
        device = frida.get_usb_device()
        main(device)