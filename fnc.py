f2 = 1
f1 = 2

f = 0

n = 20
for i in range(3, n):
    f = f1 + f2 * (i-1)
    f2 = f1
    f1 = f
    print("f("+ str(i) + ") : " + str(f))