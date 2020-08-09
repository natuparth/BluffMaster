/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <bits/stdc++.h>

using namespace std;

// Complete the candies function below.
long candies(int n, vector<int> arr) {
 int total = 0 , k = 0 , i = 0, last;
  int curr = 1,index = 0;
 while(arr[k+1]<arr[k])
  index++;
 total = (index+1)*(index+2)/2 ;
 i+=(index+1);
 last = 1;
  while(true)
  { 
      index = 0;

    k = i;
    index = 0;
    while(arr[k+1] <  arr[k])
      index++;
    

    total += (index * (index+ 1))/2;
    if(arr[i]==arr[i-1])
     {
         total += (index+1);
     }
     else
     {
         total += max(index+1, last+1);
         if(index>0)
           last = max(index+1, last+1);
         else 
            last = 1;
     }
    i += (index + 1);
    if(i>n-1)
     break;
    else if((i+1) == (n-1))
      {
          if(arr[i+1]>arr[i])
            {
             total+=(last+1);
                break;                
            }   
            else
            {
                total+=last;
                break;
            }
      }
      
      
  }
return total;
  }

}

int main()
{
   // ofstream fout(getenv("OUTPUT_PATH"));

    int n;
    cin >> n;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');

    vector<int> arr(n);

    for (int i = 0; i < n; i++) {
        int arr_item;
        cin >> arr_item;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        arr[i] = arr_item;
    }

    long result = candies(n, arr);

    cout << result << "\n";

  //  fout.close();

    return 0;
}

