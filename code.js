module.exports = {
    answer: [
        `#include <bits/stdc++.h>
        using namespace std;
        
        int main(){
            int numberOfElement;
            cin >> numberOfElement;
            vector <int> array(numberOfElement);
            int sum = 0;
            
            for(int i = 0; i < numberOfElement; i++){
                cin >> array[i];
                sum += array[i];
            }
            cout << sum;
            return 0;
        }
    `

    ]
}