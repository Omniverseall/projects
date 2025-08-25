
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
          batteryStatus = document.querySelector('.battery__status'),
          batteryPercentage = document.querySelector('.battery__percentage')
    
    
    if ('getBattery' in navigator) {
        navigator.getBattery().then((batt) =>{
            updateBattery = () =>{
                
                let level = Math.floor(batt.level * 100)
                batteryPercentage.innerHTML = level+ '%'

                
                batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

                
                if(level == 100){ 
                    batteryStatus.innerHTML = `Полный заряд <i class="ri-battery-2-fill green-color"></i>`
                    batteryLiquid.style.height = '103%' 
                }
                else if(level <= 20 && !batt.charging){ 
                    batteryStatus.innerHTML = `Низкий заряд <i class="ri-plug-line animated-red"></i>`
                }
                else if(batt.charging){ 
                    batteryStatus.innerHTML = `Заряжается... <i class="ri-flashlight-line animated-green"></i>`
                }
                else{ 
                    batteryStatus.innerHTML = ''
                }
                
                
                if(level <=20){
                    batteryLiquid.classList.add('gradient-color-red')
                    batteryLiquid.classList.remove('gradient-color-orange','gradient-color-yellow','gradient-color-green')
                }
                else if(level <= 40){
                    batteryLiquid.classList.add('gradient-color-orange')
                    batteryLiquid.classList.remove('gradient-color-red','gradient-color-yellow','gradient-color-green')
                }
                else if(level <= 80){
                    batteryLiquid.classList.add('gradient-color-yellow')
                    batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-green')
                }
                else{
                    batteryLiquid.classList.add('gradient-color-green')
                    batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-yellow')
                }
            }
            updateBattery()

            
            batt.addEventListener('chargingchange', () => {updateBattery()})
            batt.addEventListener('levelchange', () => {updateBattery()})
        })
    } else {
        batteryStatus.innerHTML = `API батареи не поддерживается`
        batteryPercentage.innerHTML = '50%'
        batteryLiquid.classList.add('gradient-color-yellow')
    }
}